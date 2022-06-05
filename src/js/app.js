// const XLSX = require("xlsx");
//              ^^^^^^^ MY GOAL!
// please help me make it work :)

const years = [];
for (i=2015;i<2023;i++){years.push(i)}
const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli","Agustus", "September", "Oktober", "November", "Desember"];

const daysOfMonth = {
	Januari: 31, Maret: 31, April: 30, Mei: 31, Juni: 30, Juli: 31,
	Agustus: 31, September: 30, Oktober: 31, November: 30,
	Desember: 31, Februari: year => (year % 4 == 0) ? 29 : 28
};

const velData = {}, dirData = {}, allCheck = {},
selectedYear = {}, selectedMonth = {}, selectedDay = {};
for (i=0;i<years.length;i++){
	selectedYear[years[i]] = false;
	for (j=0;j<months.length;j++){
		ym = `${years[i]}-${months[j]}`;
		allCheck[ym] = false;
		selectedMonth[ym] = false;
		selectedDay[ym] = { check: [], sum: 0, allCheck: false };
		velData[ym] = [];
		dirData[ym] = [];
		let days = months[j] != "Februari" ? daysOfMonth[months[j]] : daysOfMonth[months[j]](years[i]);
		for (k=0;k<days;k++){
			selectedDay[ym].check.push(false);
			velData[ym].push(0);
			dirData[ym].push(0);
		}
	}
}

const myApp = angular.module("myApp", []);
myApp.controller("mainCtrl", $scope => {
	[$scope.years, $scope.currYear, $scope.selectedYear] = [years, 2022, selectedYear];
	[$scope.months, $scope.currMonth, $scope.selectedMonth] = [months, "Mei", selectedMonth];
	[$scope.velData, $scope.dirData, $scope.selectedDay] = [velData, dirData, selectedDay];
	$scope.ym = () => `${$scope.currYear}-${$scope.currMonth}`;

	$scope.setSelYear = year => $scope.selectedYear[year] = !$scope.selectedYear[year];
	$scope.yearColor = year => $scope.selectedYear[year] ? "btn-success" : "btn-danger";
	$scope.isCurrYear = year => year == $scope.currYear && "menu-active";
	$scope.setCurrYear = year => {
		$scope.currYear = year;
		$scope.setSelYear(year);
		$scope.tgl = $scope.setDay($scope.currMonth,true);
	}

	$scope.setSelMonth = (year,month) => $scope.selectedMonth[`${year}-${month}`] = !$scope.selectedMonth[`${year}-${month}`];
	$scope.monthColor = month => $scope.selectedMonth[`${$scope.currYear}-${month}`] ? "btn-success" : "btn-danger";
	$scope.isCurrMonth = month => month == $scope.currMonth && "menu-active";
	$scope.setCurrMonth = month => {
		$scope.currMonth = month;
		$scope.setSelMonth($scope.currYear,month);
		$scope.tgl = $scope.setDay($scope.currMonth,true);
	}

	$scope.setDay = (month,arr) => {
		tgl = [];
		days = month == "Februari" ? daysOfMonth.Februari($scope.currYear) : daysOfMonth[month];
		if (!arr) return days;
		for (i=1;i<days+1;i++){
			tgl.push(i);
		}
		return tgl; 
	}
	$scope.tgl = $scope.setDay($scope.currMonth,true);

	$scope.setVelData = idx => {
		value = parseInt(document.getElementById(`vel-${$scope.ym()}-${idx}`).value);
		$scope.velData[$scope.ym()][idx-1] = value;
	}
	$scope.setDirData = idx => {
		value = parseInt(document.getElementById(`dir-${$scope.ym()}-${idx}`).value);
		$scope.dirData[$scope.ym()][idx-1] = value;
	}

	$scope.setAllCheck = () => {
		let ym = $scope.ym();
		$scope.selectedDay[ym].allCheck = !$scope.selectedDay[ym].allCheck;
		for (i=0;i<selectedDay[ym].check.length;i++){
			$scope.selectedDay[ym].check[i] = $scope.selectedDay[ym].allCheck;
		}
		$scope.selectedDay[ym].sum = $scope.selectedDay[ym].check.length;
	}

	$scope.setSelDay = day => {
		let ym = $scope.ym();
		$scope.selectedDay[ym].check[day-1] = !$scope.selectedDay[ym].check[day-1];
		$scope.selectedDay[ym].check[day-1] ? $scope.selectedDay[ym].sum+=1 : $scope.selectedDay[ym].sum-=1;
		$scope.selectedDay[ym].allCheck = $scope.selectedDay[ym].sum == $scope.selectedDay[ym].check.length;
	}
});