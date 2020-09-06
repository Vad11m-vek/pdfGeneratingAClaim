let $nameOfTheLegalEntity = document.querySelector('#nameOfTheLegalEntity').value;
let $TINorUSREOU = document.querySelector('#TINorUSREOU').value;
let $Location = document.querySelector('#Location').value;
let $tel = document.querySelector('#tel').value;
let $emailUser = document.querySelector('#emailUser').value;
let $defectCollection = document.querySelectorAll('[name="defect"]');
let $reimburseCollection = document.querySelectorAll('[name="reimburse"]');
let $cancellationCollection = document.querySelectorAll('[name="cancellation"]');
let defectReasonCollection = '';
let reimburseReasonCollection = '';
let cancellationReasonCollection = '';
let $invoiceNumber = document.querySelector('#invoiceNumber').value;
let $price = document.querySelector('#price').value;


// cancellation

document.querySelector('h3').addEventListener('click', () => {
	$price = document.querySelector('#price').value;
	if ($price.length == 0) {
		console.log($price.length);
	} else {
		console.log('veloseped');
	}
})

let doc = new jsPDF();
function documentWriter() {
	doc.setFontSize(12);
	doc.addFont("font/PTSans.ttf", "PTSans", "normal");
	doc.setFont("PTSans");
	doc.text("Бланк претензії для – юридичних осіб та ФОП", 110, 15);
	doc.text('ТОВ «Нова Пошта»', 110, 20);
	//out name
	let strNameOfTheLegalEntity = doc.splitTextToSize('' + $nameOfTheLegalEntity, 100)
	doc.text(strNameOfTheLegalEntity, 110, 25);
	//out ІПН або ЄДРПОУ
	doc.text("ІПН або ЄДРПОУ", 110, 40);
	let strTINorUSREOU = doc.splitTextToSize('' + $TINorUSREOU, 50)
	doc.text(strTINorUSREOU, 150, 40);
	//out Місцезнаходження
	doc.text("Місцезнаходження :", 110, 45);
	let strLocation = doc.splitTextToSize('' + $Location, 100)
	doc.text(strLocation, 110, 50);
	//out number phone
	doc.text("Моб. тел. :", 110, 65);
	let strtel = doc.splitTextToSize('' + $tel, 50)
	doc.text(strtel, 150, 65);
	//out email
	doc.text("Ел. пошта :", 110, 70);
	let strEmailUser = doc.splitTextToSize('' + $emailUser, 50)
	doc.text(strEmailUser, 150, 70);
	//declare
	doc.setFontSize(20);
	doc.text("ПРЕТЕНЗІЯ", 80, 80);
	doc.setFontSize(14);
	//reason
	doc.text("У зв’язку з ", 8, 90);
	let defectReason = doc.splitTextToSize('' + defectReasonCollection, 190)
	doc.text(defectReason, 30, 90);
	let textDuringTransportation = doc.splitTextToSize('відправлення, що сталося під час надання послуги з організації його перевезення за експрес-накладною', 200)
	doc.text(textDuringTransportation, 8, 100);
	doc.text(`№ ${$invoiceNumber} прошу :`, 52, 105);
	// nead update price
	$price = document.querySelector('#price').value;
	if (!($price.length == 0)) {
		doc.text(`відшкодувати вартість відправлення в розмірі ${$price} грн.`, 8, 110);
	}
	if (!(reimburseReasonCollection.length == 0)) {
		doc.text(`відшкодувати сплачену вартість${reimburseReasonCollection}`, 8, 115);
	}
	if (!(cancellationReasonCollection.length == 0)) {
		doc.text(`анулювати нараховану плату за${cancellationReasonCollection}`, 8, 120);
	}



	// var strArr = doc.splitTextToSize("A longer title that might be split", 50)
	// doc.text(strArr, 50, 50);
}
//save doc
start.addEventListener('click', () => {
	checkingAbout();
	chekingReimburse();
	chekingCancellation();
	documentWriter();
	var string = doc.output('datauristring');
	var embed = "<embed width='100%' height='100%' src='" + string + "' />"
	var x = window.open();
	x.document.open();
	x.document.write(embed);
	x.document.close();
	// doc.save('hello_world.pdf')
});
function checkingAbout() {
	for (i in $defectCollection) {
		if ($defectCollection[i].checked == true) {
			if (!defectReasonCollection) {
				defectReasonCollection += $defectCollection[i].value;
			} else {
				defectReasonCollection += ',';
				defectReasonCollection += $defectCollection[i].value;
			}
		}
	}
	if (!defectReasonCollection) {
		defectReasonCollection += document.querySelector('#others').value;
	}
	return defectReasonCollection;
}
function chekingReimburse() {
	for (i in $reimburseCollection) {
		if ($reimburseCollection[i].checked == true) {
			if (!reimburseReasonCollection) {
				reimburseReasonCollection += $reimburseCollection[i].value;
			} else {
				reimburseReasonCollection += ',';
				reimburseReasonCollection += $reimburseCollection[i].value;
			}
		}
	}
	if (reimburseReasonCollection) {
		reimburseReasonCollection += '.';
	}
	return reimburseReasonCollection;
}
function chekingCancellation() {
	for (i in $cancellationCollection) {
		if ($cancellationCollection[i].checked == true) {
			if (!cancellationReasonCollection) {
				cancellationReasonCollection += $cancellationCollection[i].value;
			} else {
				cancellationReasonCollection += ',';
				cancellationReasonCollection += $cancellationCollection[i].value;
			}
		}
	}
	if (cancellationReasonCollection) {
		cancellationReasonCollection += ';';
	}
	return reimburseReasonCollection;
}
