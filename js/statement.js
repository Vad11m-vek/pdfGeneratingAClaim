let $nameOfTheLegalEntity = document.querySelector('#nameOfTheLegalEntity');
let $TINorUSREOU = document.querySelector('#TINorUSREOU');
let $Location = document.querySelector('#Location');
let $tel = document.querySelector('#tel');
let $emailUser = document.querySelector('#emailUser');
let $defectCollection = document.querySelectorAll('[name="defect"]');
let $reimburseCollection = document.querySelectorAll('[name="reimburse"]');
let $cancellationCollection = document.querySelectorAll('[name="cancellation"]');
let defectReasonCollection = '';
let reimburseReasonCollection = '';
let cancellationReasonCollection = '';
let $invoiceNumber = document.querySelector('#invoiceNumber');
let $price = document.querySelector('#price');
let $otherProblem = document.querySelector('#otherProblem');
let $theEssenceOfTheProblem = document.querySelector('#theEssenceOfTheProblem');
let $nameOfThePerson = document.querySelector('#nameOfThePerson');
let $identificationCode = document.querySelector('#identificationCode');
let $currentAccount = document.querySelector('#currentAccount');
let $MFIBank = document.querySelector('#MFIBank');
let $copyOfTheAct = document.querySelector('#copyOfTheAct');
let $aCopyOfTheDocumentConfirmingTheCostOfSending = document.querySelector('#aCopyOfTheDocumentConfirmingTheCostOfSending');
let $dateDoc = document.querySelector('#dateDoc').value = moment().format('YYYY-MM-DD');
let $otherAdditions = document.querySelector('#otherAdditions');
let $clientSignature = document.querySelector('#clientSignature');
let urlClientSignature;
let claimDetails = {
	nameOfTheLegalEntity: '',
	TINorUSREOU: '',
	Location: '',
	tel: '',
	emailUser: '',
	nameOfThePerson: '',
	identificationCode: '',
	currentAccount: '',
	MFIBank: '',
	clientSignature: '',
};
//check url clientSignature
$clientSignature.addEventListener('change', event => {
	let oFReader = new FileReader();
	oFReader.readAsDataURL(document.querySelector('#clientSignature').files[0]);
	oFReader.onload = function (oFREvent) {
		urlClientSignature = oFREvent.target.result;
	};
});
if (getCookie('claimDetail')) {
	let claimDetailCookie = JSON.parse(getCookie('claimDetail'));
	$nameOfTheLegalEntity.value = claimDetailCookie.nameOfTheLegalEntity;
	$TINorUSREOU.value = claimDetailCookie.TINorUSREOU;
	$Location.value = claimDetailCookie.Location;
	$tel.value = claimDetailCookie.tel;
	$emailUser.value = claimDetailCookie.emailUser;
}
let doc = new jsPDF();
function documentWriter() {
	//get new value
	$nameOfTheLegalEntity = document.querySelector('#nameOfTheLegalEntity');
	$TINorUSREOU = document.querySelector('#TINorUSREOU');
	$Location = document.querySelector('#Location');
	$tel = document.querySelector('#tel');
	$emailUser = document.querySelector('#emailUser');
	$identificationCode = document.querySelector('#identificationCode');
	//write pdf
	doc.setFontSize(11);
	doc.addFont("font/PTSans.ttf", "PTSans", "normal");
	doc.setFont("PTSans");
	doc.text('ТОВ «Нова Пошта»', 110, 20);
	//out name
	let strNameOfTheLegalEntity = doc.splitTextToSize('' + $nameOfTheLegalEntity.value, 100)
	doc.text(strNameOfTheLegalEntity, 110, 25);
	//out ІПН або ЄДРПОУ
	doc.text("ІПН або ЄДРПОУ", 110, 40);
	let strTINorUSREOU = doc.splitTextToSize('' + $TINorUSREOU.value, 50)
	doc.text(strTINorUSREOU, 150, 40);
	//out Місцезнаходження
	doc.text("Місцезнаходження :", 110, 45);
	let strLocation = doc.splitTextToSize('' + $Location.value, 100)
	doc.text(strLocation, 110, 50);
	//out number phone
	doc.text("Моб. тел. :", 110, 65);
	let strtel = doc.splitTextToSize('' + $tel.value, 50)
	doc.text(strtel, 150, 65);
	//out email
	doc.text("Ел. пошта :", 110, 70);
	let strEmailUser = doc.splitTextToSize('' + $emailUser.value, 50)
	doc.text(strEmailUser, 150, 70);
	//declare
	doc.setFontSize(17);
	doc.text("Заява", 80, 80);
	doc.setFontSize(11);
	//about problem
	// doc.text('Суть проблеми / опис відправлення: ', 8, 140);
	let strTheEssenceOfTheProblem = doc.splitTextToSize('' + $theEssenceOfTheProblem.value, 200)
	doc.text(strTheEssenceOfTheProblem, 8, 145);
	doc.setFontSize(8);
	//signature img
	// doc.addImage(`${img.src}`, "JPEG", 140, 250, 46, 34);
	doc.addImage(`${img.src}`, "JPEG", 120, 243, 46, 34);
	//Additions Додатки:
	$dateDoc = document.querySelector('#dateDoc');
	doc.text(`Дата  ${reverseValueDate($dateDoc.value)}р.`, 5, 262);
	//signature str
	doc.text('Підпис Клієнта __________________', 110, 262);
	//signature of author
	doc.setFontSize(7);
	doc.text('supported by Vad11m', 180, 295);
	//record Json
	claimDetails.nameOfTheLegalEntity = $nameOfTheLegalEntity.value;
	claimDetails.TINorUSREOU = $TINorUSREOU.value;
	claimDetails.Location = $Location.value;
	claimDetails.tel = $tel.value;
	claimDetails.emailUser = $emailUser.value;
	claimDetails.clientSignature = $clientSignature.value;
	setCookie('claimDetail', JSON.stringify(claimDetails), 360);
}
//save doc
start.addEventListener('click', () => {
	checkingAbout();
	chekingReimburse();
	chekingCancellation();
	documentWriter();
	let string = doc.output('datauristring');
	let embed = "<embed width='100%' height='100%' src='" + string + "' />"
	doc.save(`Заява.pdf`)
});
openWindow.addEventListener('click', () => {
	// chekingReimburse();
	// chekingCancellation();
	documentWriter();
	let string = doc.output('datauristring');
	let embed = "<embed width='100%' height='100%' src='" + string + "' />"
	let x = window.open();
	x.document.open();
	x.document.write(embed);
	x.document.close();
})
//cheking or ampty value and get . , ; and function reverse time


function reverseValueDate(dateReverse) {
	let massive = dateReverse.split('-').reverse();
	return massive.toString().replace(',', '/').replace(',', '/');
}
// Cookie functions
function getCookieValue(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}
//img save test
// Get all variables
var bannerImage = document.getElementById('clientSignature');
var result = document.getElementById('res');
var img = document.getElementById('tableBanner');
bannerImage.addEventListener('change', function () {
	var file = this.files[0];
	// declare a maxSize (3Mb)
	var maxSize = 3000000;

	if (file.type.indexOf('image') < 0) {
		res.innerHTML = 'invalid type';
		return;
	}
	var fReader = new FileReader();
	fReader.onload = function () {
		img.onload = function () {
			// if localStorage fails, it should throw an exception
			try {
				// pass the ratio of the file size/maxSize to your toB64 func in case we're already out of scope
				localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type));
			}
			catch (e) {
				var msg = e.message.toLowerCase();
				// We exceeded the localStorage quota
				if (msg.indexOf('storage') > -1 || msg.indexOf('quota') > -1) {
					// we're dealing with a jpeg image :  try to reduce the quality
					if (file.type.match(/jpe?g/)) {
						console.log('reducing jpeg quality');
						localStorage.setItem("imgData", getBase64Image(img, (file.size / maxSize), file.type, 0.7));
					}
					// we're dealing with a png image :  try to reduce the size
					else {
						console.log('reducing png size');
						// maxSize is a total approximation I got from some tests with a random pixel generated img
						var maxPxSize = 750000,
							imgSize = (img.width * img.height);
						localStorage.setItem("imgData", getBase64Image(img, (imgSize / maxPxSize), file.type));
					}
				}
			}
		}
		img.src = fReader.result;
	};
	fReader.readAsDataURL(file);
});
function getBase64Image(img, sizeRatio, type, quality) {
	// if we've got an svg, don't convert it, svg will certainly be less big than any pixel image
	if (type.indexOf('svg+xml') > 0) return img.src;
	// if we've got a jpeg
	if (type.match(/jpe?g/)) {
		// and the sizeRatio is okay, don't convert it
		if (sizeRatio <= 1) return img.src;
	}
	// if we've got some other image type
	else type = 'image/png';
	if (!quality) quality = 1;
	var canvas = document.createElement("canvas");
	// if our image file is too large, then reduce its size
	canvas.width = (sizeRatio > 1) ? (img.width / sizeRatio) : img.width;
	canvas.height = (sizeRatio > 1) ? (img.height / sizeRatio) : img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	// if we already tried to reduce its size but it's still failing, then reduce the jpeg quality
	var dataURL = canvas.toDataURL(type, quality);
	return dataURL;
}
function fetchimage() {
	var dataImage = localStorage.getItem('imgData');
	img.src = dataImage;
}
// Call fetch to get image from localStorage.
fetchimage();