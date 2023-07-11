import React, { Component } from "react";
import {
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Col, Row } from "react-native-easy-grid";
import { Calendar, LocaleConfig } from "react-native-calendars";

//Redux
import { connect } from "react-redux";
import {
  fetchWeightData,
  fetchWaistData,
  fetchThighData,
  fetchArmsData,
  fetchHeightData,
  fetchChestData,
  fetchFatData,
  loadingStart,
} from "../redux/actions/dashboard";

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { LineChart } from "react-native-chart-kit";
import "react-native-svg";
import normalize from "react-native-normalize";
import moment from "moment";
import { t } from "../../../locals";
import i18n from "i18n-js";
import * as Localization from "expo-localization";
import styleCss from "../../style";

const lang = (i18n.locale = Localization.locale.substr(0, 2));
const today = moment().format("YYYY-MM-DD");

if (lang == "it") {
  LocaleConfig.locales["it"] = {
    monthNames: [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ],
    monthNamesShort: [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "DOMENICA",
      "LUNEDI",
      "MARTEDÌ",
      "MERCOLEDÌ",
      "GIOVEDI",
      "VENERDÌ",
      "SABATO",
    ],
    dayNamesShort: ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"],
  };
  LocaleConfig.defaultLocale = "it";
} else if (lang == "ar") {
  LocaleConfig.locales["ar"] = {
    monthNames: [
      "كانون الثاني",
      "شهر فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "تموز",
      "أغسطس",
      "شهر سبتمبر",
      "اكتوبر",
      "شهر نوفمبر",
      "ديسمبر",
    ],
    monthNamesShort: [
      "كانون الثاني",
      "شهر فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "تموز",
      "أغسطس",
      "شهر سبتمبر",
      "اكتوبر",
      "شهر نوفمبر",
      "ديسمبر",
    ],
    dayNames: [
      "الأحد",
      "الاثنين",
      "يوم الثلاثاء",
      "الأربعاء",
      "يوم الخميس",
      "جمعة",
      "السبت",
    ],
    dayNamesShort: [
      "الأحد",
      "الاثنين",
      "يوم الثلاثاء",
      "الأربعاء",
      "يوم الخميس",
      "جمعة",
      "السبت",
    ],
  };

  LocaleConfig.defaultLocale = "ar";
} else if (lang == "ca") {
  LocaleConfig.locales["ca"] = {
    monthNames: [
      "Gener",
      "Febrer",
      "Març",
      "Abril",
      "Maig",
      "Juny",
      "Juliol",
      "Agost",
      "Setembre",
      "Octubre",
      "de novembre",
      "Desembre",
    ],
    monthNamesShort: [
      "Gen",
      "Feb",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Oct",
      "Nov",
      "Des",
    ],
    dayNames: [
      "DIUMENGE",
      "DILLUNS",
      "DIMARTS",
      "DIMECRES",
      "DIJOUS",
      "DIVENDRES",
      "DISSABTE",
    ],
    dayNamesShort: ["Dg.", "Dl.", "Dt.", "Dc.", "Dj.", "Dv.", "Ds."],
  };

  LocaleConfig.defaultLocale = "ca";
} else if (lang == "cs") {
  LocaleConfig.locales["cs"] = {
    monthNames: [
      "Leden",
      "Únor",
      "březen",
      "Duben",
      "Smět",
      "červen",
      "červenec",
      "Srpen",
      "Září",
      "říjen",
      "Listopad",
      "Prosinec",
    ],
    monthNamesShort: [
      "Led",
      "Úno",
      "bře",
      "Dub",
      "Smě",
      "Čer",
      "čer",
      "Srp",
      "Zář",
      "říj",
      "Lis",
      "Pro",
    ],
    dayNames: [
      "NEDĚLE",
      "PONDĚLÍ",
      "ÚTERÝ",
      "STŘEDA",
      "ČTVRTEK",
      "PÁTEK",
      "SOBOTA",
    ],
    dayNamesShort: ["NED.", "PON.", "ÚTE.", "STŘ.", "ČTV.", "PÁT.", "SOB."],
  };

  LocaleConfig.defaultLocale = "cs";
} else if (lang == "da") {
  LocaleConfig.locales["da"] = {
    monthNames: [
      "Januar",
      "Februar",
      "Marts",
      "April",
      "Kan",
      "Juni",
      "Juli",
      "August",
      "September",
      "OKtober",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Kan",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "SØNDAG",
      "MANDAG",
      "TIRSDAG",
      "ONSDAG",
      "TORSDAG",
      "FREDAG",
      "LØRDAG",
    ],
    dayNamesShort: ["SØN.", "MAN.", "TIR.", "ONS.", "TOR.", "FRE.", "LØR."],
  };

  LocaleConfig.defaultLocale = "da";
} else if (lang == "de") {
  LocaleConfig.locales["de"] = {
    monthNames: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Kann",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mär",
      "Apr",
      "Kan",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "SONNTAG",
      "MONTAG",
      "DIENSTAG",
      "MITTWOCH",
      "DONNERSTAG",
      "FREITAG",
      "SAMSTAG",
    ],
    dayNamesShort: ["SON.", "MON.", "DIE.", "MIT.", "DON.", "FRE.", "SAM."],
  };

  LocaleConfig.defaultLocale = "de";
} else if (lang == "el") {
  LocaleConfig.locales["el"] = {
    monthNames: [
      "Ιανουάριος",
      "Φεβρουάριος",
      "Μάρτιος",
      "Απρίλιος",
      "Ενδέχεται",
      "Ιούνιος",
      "Ιούλιος",
      "Αύγουστος",
      "Σεπτέμβριος",
      "Οκτώβριος",
      "Νοέμβριος",
      "Δεκέμβριος",
    ],
    monthNamesShort: [
      "Ιαν",
      "Φεβ",
      "Μάρ",
      "Απρ",
      "Ενδ",
      "Ιούv",
      "Ιούλ",
      "Αύγ",
      "Σεπ",
      "Οκτ",
      "Νοέ",
      "Δεκ",
    ],
    dayNames: [
      "ΚΥΡΙΑΚΗ",
      "ΔΕΥΤΕΡΑ",
      "ΤΡΙΤΗ",
      "ΤΕΤΑΡΤΗ",
      "ΠΕΜΠΤΗ",
      "ΠΑΡΑΣΚΕΥΗ",
      "ΣΑΒΒΑΤΟ",
    ],
    dayNamesShort: ["ΚΥΡ.", "ΔΕΥ.", "ΤΡΙ.", "ΤΕΤ.", "ΠΕΜ.", "ΠΑΡ.", "ΣΑΒ."],
  };

  LocaleConfig.defaultLocale = "el";
} else if (lang == "es") {
  LocaleConfig.locales["es"] = {
    monthNames: [
      "Enero",
      "Febrero",
      "Marcha",
      "Abril",
      "Mayo",
      "Junio",
      "Mes de julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    dayNames: [
      "DOMINGO",
      "LUNES",
      "MARTES",
      "MIÉRCOLES",
      "JUEVES",
      "VIERNES",
      "SÁBADO",
    ],
    dayNamesShort: ["DOM.", "LUN.", "MAR.", "MIÉ.", "JUE.", "VIE.", "SÁB."],
  };

  LocaleConfig.defaultLocale = "es";
} else if (lang == "et") {
  LocaleConfig.locales["et"] = {
    monthNames: [
      "Jaanuar",
      "Veebruar",
      "Märts",
      "Aprill",
      "Mai",
      "Juunil",
      "Juuli",
      "August",
      "Septembrini",
      "Oktoober",
      "Novembrini",
      "Detsembrini",
    ],
    monthNamesShort: [
      "Jaa",
      "Vee",
      "Mär",
      "Apr",
      "Mai",
      "Juun",
      "Juul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Det",
    ],
    dayNames: [
      "PÜHAPÄEV",
      "ESMASPÄEV",
      "TEISIPÄEV",
      "KOLMAPÄEV",
      "NELJAPÄEV",
      "REEDE",
      "LAUPÄEV",
    ],
    dayNamesShort: ["PÜH.", "ESM.", "TEI.", "KOL.", "NEL.", "REE.", "LAU."],
  };

  LocaleConfig.defaultLocale = "et";
} else if (lang == "fa") {
  LocaleConfig.locales["fa"] = {
    monthNames: [
      "ژانویه",
      "فوریه",
      "مارس",
      "آوریل",
      "ممکن است",
      "ژوئن",
      "جولای",
      "مرداد",
      "سپتامبر",
      "اکتبر",
      "نوامبر",
      "دسامبر",
    ],
    monthNamesShort: [
      "ژانویه",
      "فوریه",
      "مارس",
      "آوریل",
      "ممکن است",
      "ژوئن",
      "جولای",
      "مرداد",
      "سپتامبر",
      "اکتبر",
      "نوامبر",
      "دسامبر",
    ],
    dayNames: [
      "یکشنبه",
      "دوشنبه",
      "سهشنبه",
      "چهار شنبه",
      "پنج شنبه",
      "جمعه",
      "شنبه",
    ],
    dayNamesShort: [
      "یکشنبه",
      "دوشنبه",
      "سهشنبه",
      "چهار شنبه",
      "پنج شنبه",
      "جمعه",
      "شنبه",
    ],
  };

  LocaleConfig.defaultLocale = "fa";
} else if (lang == "fi") {
  LocaleConfig.locales["fi"] = {
    monthNames: [
      "Tammikuu",
      "Helmikuu",
      "Maaliskuu",
      "Huhtikuu",
      "Saattaa",
      "Kesäkuu",
      "Heinäkuu",
      "Elokuu",
      "Syyskuu",
      "Lokakuu",
      "Marraskuu",
      "Joulukuu",
    ],
    monthNamesShort: [
      "Tam",
      "Hel",
      "Maa",
      "Huh",
      "Saa",
      "Kes",
      "Hei",
      "Elo",
      "Syy",
      "Lok",
      "Mar",
      "Jou",
    ],
    dayNames: [
      "SUNNUNTAI",
      "MAANANTAI",
      "TIISTAI",
      "KESKIVIIKKO",
      "TORSTAI",
      "PERJANTAI",
      "Lauantai",
    ],
    dayNamesShort: ["SON.", "MON.", "DIE.", "MIT.", "DON.", "FRE.", "SAM."],
  };

  LocaleConfig.defaultLocale = "fi";
} else if (lang == "fr") {
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Jan",
      "Fév",
      "Mar",
      "Avr",
      "Mai",
      "Juin",
      "Juil",
      "Aoû",
      "Sep",
      "Oct",
      "Nov",
      "Déc",
    ],
    dayNames: [
      "DIMANCHE",
      "LUNDI",
      "MARDI",
      "MERCREDI",
      "JEUDI",
      "VENDREDI",
      "SAMEDI",
    ],
    dayNamesShort: ["DIM.", "LUN.", "MAR.", "MER.", "JEU.", "VEN.", "SAM."],
  };
  LocaleConfig.defaultLocale = "fr";
} else if (lang == "hi") {
  LocaleConfig.locales["hi"] = {
    monthNames: [
      "जनवरी",
      "फरवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितम्बर",
      "अक्टूबर",
      "नवम्बर",
      "दिसम्बर",
    ],
    monthNamesShort: [
      "जनवरी",
      "फरवरी",
      "मार्च",
      "अप्रैल",
      "मई",
      "जून",
      "जुलाई",
      "अगस्त",
      "सितम्बर",
      "अक्टूबर",
      "नवम्बर",
      "दिसम्बर",
    ],
    dayNames: [
      "रविवार",
      "सोमवार",
      "मंगलवार",
      "बुधवार",
      "गुरुवार",
      "शुक्रवार",
      "शनिवार",
    ],
    dayNamesShort: ["रवि.", "सोम.", "मंगल.", "बुध.", "गुरु.", "शुक्र.", "शनि."],
  };
  LocaleConfig.defaultLocale = "hi";
} else if (lang == "hr") {
  LocaleConfig.locales["hr"] = {
    monthNames: [
      "Siječnja",
      "Veljača",
      "Ožujak",
      "Travanj",
      "Svibanj",
      "Lipanj",
      "Srpanj",
      "Kolovoz",
      "Rujan",
      "Listopad",
      "Studeni",
      "Prosinac",
    ],
    monthNamesShort: [
      "Sij",
      "Vel",
      "Ožu",
      "Tra",
      "Svi",
      "Lip",
      "Srp",
      "Kol",
      "Ruj",
      "Lis",
      "Stu",
      "Pro",
    ],
    dayNames: [
      "NEDJELJA",
      "PONEDJELJAK",
      "UTORAK",
      "SRIJEDA",
      "ČETVRTAK",
      "PETAK",
      "SUBOTA",
    ],
    dayNamesShort: ["NED.", "PON.", "UTO.", "SRI.", "ČET.", "PET.", "SUB."],
  };

  LocaleConfig.defaultLocale = "hr";
} else if (lang == "hu") {
  LocaleConfig.locales["hu"] = {
    monthNames: [
      "Január",
      "Február",
      "Március",
      "április",
      "Lehet",
      "Június",
      "Július",
      "Augusztus",
      "Szeptember",
      "Október",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Már",
      "ápr",
      "Leh",
      "jún",
      "júl",
      "Aug",
      "Szep",
      "Okt",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "VASÁRNAP",
      "HÉTFŐ",
      "KEDD",
      "SZERDA",
      "CSÜTÖRTÖK",
      "PÉNTEK",
      "SZOMBAT",
    ],
    dayNamesShort: ["VAS.", "HÉT.", "KED.", "SZE.", "CSÜ.", "PÉN.", "SZO."],
  };

  LocaleConfig.defaultLocale = "hu";
} else if (lang == "id") {
  LocaleConfig.locales["id"] = {
    monthNames: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    dayNames: ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"],
    dayNamesShort: ["MIN.", "SEN.", "SEL.", "RAB.", "KAM.", "JUM.", "SAB."],
  };

  LocaleConfig.defaultLocale = "id";
} else if (lang == "ja") {
  LocaleConfig.locales["ja"] = {
    monthNames: [
      "一月 ",
      "二月 ",
      "三月",
      "四月 ",
      "五月",
      "六月 ",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthNamesShort: [
      "一月 ",
      "二月 ",
      "三月",
      "四月 ",
      "五月",
      "六月 ",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    dayNames: [
      "日曜日",
      "月曜",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
    dayNamesShort: [
      "日曜日",
      "月曜",
      "火曜日",
      "水曜日",
      "木曜日",
      "金曜日",
      "土曜日",
    ],
  };

  LocaleConfig.defaultLocale = "ja";
} else if (lang == "lt") {
  LocaleConfig.locales["lt"] = {
    monthNames: [
      "Sausis",
      "Vasaris",
      "Kovas",
      "Balandis",
      "Gegužė",
      "Birželis",
      "Liepa",
      "Rugpjūtis",
      "Rugsėjis",
      "Spalis",
      "Lapkritis",
      "Gruodis",
    ],
    monthNamesShort: [
      "Sau",
      "Vas",
      "Kov",
      "Bal",
      "Geg",
      "Bir",
      "Lie",
      "Rugp",
      "Rugs",
      "Spa",
      "Lap",
      "Gru",
    ],
    dayNames: [
      "Sekmadienis",
      "Pirmadienis",
      "Antradienis",
      "Trečiadienis",
      "Ketvirtadienis",
      "Penktadienis",
      "Šeštadienis",
    ],
    dayNamesShort: ["SEK.", "PIR.", "ANT.", "TRE.", "KET.", "PEN.", "ŠEŠ."],
  };

  LocaleConfig.defaultLocale = "lt";
} else if (lang == "nl") {
  LocaleConfig.locales["nl"] = {
    monthNames: [
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Maa",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "ZONDAG",
      "MAANDAG",
      "DINSDAG",
      "WOENSDAG",
      "DONDERDAG",
      "VRIJDAG",
      "ZATERDAG",
    ],
    dayNamesShort: ["ZON.", "MAAN.", "DIN.", "WOE.", "DON.", "VRI.", "ZAT."],
  };

  LocaleConfig.defaultLocale = "nl";
} else if (lang == "pl") {
  LocaleConfig.locales["pl"] = {
    monthNames: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
    monthNamesShort: [
      "Sty",
      "Lut",
      "Mar",
      "Kwi",
      "Maj",
      "Cze",
      "Lip",
      "Sie",
      "Wrz",
      "Paź",
      "Lis",
      "Gru",
    ],
    dayNames: [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ],
    dayNamesShort: ["nie.", "pon.", "wto.", "śro.", "czw.", "pią.", "sob."],
  };

  LocaleConfig.defaultLocale = "pl";
} else if (lang == "pt") {
  LocaleConfig.locales["pt"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "DOMIGO",
      "SEGUNDA-FEIRA",
      "TERÇA",
      "QUARTA-FEIRA",
      "QUINTA-FEIRA",
      "SEXTA-FEIRA",
      "SÁBADO",
    ],
    dayNamesShort: ["DOM.", "SEG.", "TER.", "QUAR.", "QUIN.", "SEX.", "SÁB."],
  };

  LocaleConfig.defaultLocale = "pt";
} else if (lang == "ro") {
  LocaleConfig.locales["ro"] = {
    monthNames: [
      "ianuarie",
      "februarie",
      "martie",
      "aprilie",
      "mai",
      "iunie",
      "iulie",
      "august",
      "septembrie",
      "octombrie",
      "noiembrie",
      "decembrie",
    ],
    monthNamesShort: [
      "ian",
      "feb",
      "mar",
      "apr",
      "mai",
      "iun",
      "iul",
      "aug",
      "set",
      "oct",
      "noi",
      "dec",
    ],
    dayNames: [
      "Duminică",
      "Luni",
      "Marţi",
      "Miercuri",
      "Joi",
      "Vineri",
      "Sâmbătă",
    ],
    dayNamesShort: ["Dum.", "Lun.", "Mar.", "Mie.", "Joi.", "Vin.", "Sâm."],
  };

  LocaleConfig.defaultLocale = "ro";
} else if (lang == "ru") {
  LocaleConfig.locales["ru"] = {
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    dayNames: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
    dayNamesShort: [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ],
  };

  LocaleConfig.defaultLocale = "ru";
} else if (lang == "sv") {
  LocaleConfig.locales["sv"] = {
    monthNames: [
      "Januari",
      "Februari",
      "Mars",
      "April",
      "Maj",
      "Juni",
      "Juli",
      "Augusti",
      "September",
      "Oktober",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "Söndag",
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
    ],
    dayNamesShort: ["Sön.", "Mån.", "Tis.", "Ons.", "Tor.", "Fre.", "Lör."],
  };

  LocaleConfig.defaultLocale = "sv";
} else if (lang == "tr") {
  LocaleConfig.locales["tr"] = {
    monthNames: [
      "Ocak",
      "şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],
    monthNamesShort: [
      "Oca",
      "şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ],
    dayNames: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "çarşamba",
      "Perşembe",
      "Cumā",
      "Cumartesi",
    ],
    dayNamesShort: ["Paz.", "Paz.", "Sal.", "çar.", "Per.", "Cum.", "Cuma."],
  };

  LocaleConfig.defaultLocale = "tr";
} else if (lang == "vi") {
  LocaleConfig.locales["vi"] = {
    monthNames: [
      "Tháng một",
      "Tháng hai",
      "Tháng ba",
      "Tháng tư",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng mười hai",
    ],
    monthNamesShort: [
      "Tháng một",
      "Tháng hai",
      "Tháng ba",
      "Tháng tư",
      "Tháng năm",
      "Tháng sáu",
      "Tháng bảy",
      "Tháng tám",
      "Tháng chín",
      "Tháng mười",
      "Tháng mười một",
      "Tháng mười hai",
    ],
    dayNames: [
      "chủ nhật",
      "thứ hai",
      "thứ ba",
      "thứ tư",
      "thứ năm",
      "thứ sáu",
      "thứ bảy",
    ],
    dayNamesShort: [
      "chủ nhật",
      "thứ hai",
      "thứ ba",
      "thứ tư",
      "thứ năm",
      "thứ sáu",
      "thứ bảy",
    ],
  };

  LocaleConfig.defaultLocale = "vi";
} else if (lang == "zh") {
  LocaleConfig.locales["zh"] = {
    monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月 ",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    monthNamesShort: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月 ",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ],
    dayNames: [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
    dayNamesShort: [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ],
  };

  LocaleConfig.defaultLocale = "zh";
} else {
  LocaleConfig.locales["en"] = {
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    monthNamesShort: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    dayNames: [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ],
    dayNamesShort: ["SUN.", "MON.", "TUE.", "WED.", "THUR.", "FRI.", "SAT."],
  };

  LocaleConfig.defaultLocale = "en";
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      two_collapsed: false,
      three_collapsed: false,
      four_collapsed: false,
      five_collapsed: false,
      six_collapsed: false,
      seven_collapsed: false,
      dateSelected: "",
      date: "",
    };
    // this.onDayPress = this.onDayPress.bind(this);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerShown: false,
    };
  };

  toggleDrawer = ({ navigation }) => {
    this.props.navigation.toggleDrawer();
  };

  async componentDidMount() {
    const { loadingStart } = this.props;
    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");
    this.setState({ loader: true });

    //Redux loading start function call
    loadingStart();

    this.loadWeightReport();
    this.loadWaistReport();
    this.loadThighReport();
    this.loadArmsReport();
    this.loadHeightReport();
    this.loadChestReport();
    this.loadFatReport();
  }

  onRefresh() {
    const { loadingStart } = this.props;
    //Redux loading start function call
    loadingStart();
    this.setState({ collapsed: false });
    this.setState({ two_collapsed: false });
    this.setState({ three_collapsed: false });
    this.setState({ four_collapsed: false });
    this.setState({ five_collapsed: false });
    this.setState({ six_collapsed: false });
    this.setState({ seven_collapsed: false });
    this.loadWeightReport();
    this.loadWaistReport();
    this.loadThighReport();
    this.loadArmsReport();
    this.loadHeightReport();
    this.loadChestReport();
    this.loadFatReport();
  }

  // Weight Report Data
  async loadWeightReport() {
    const { fetchWeightData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Weight",
    };

    //Redux Action call
    fetchWeightData(params);
  }

  // Waist Report Data
  async loadWaistReport() {
    const { fetchWaistData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Waist",
    };

    //Redux Action call
    fetchWaistData(params);
  }

  // Thigh Report Data
  async loadThighReport() {
    const { fetchThighData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Thigh",
    };

    //Redux Action call
    fetchThighData(params);
  }

  // Arms Report Data

  async loadArmsReport() {
    const { fetchArmsData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Arms",
    };

    //Redux Action call
    fetchArmsData(params);
  }

  // Height Report Data

  async loadHeightReport() {
    const { fetchHeightData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Height",
    };

    //Redux Action call
    fetchHeightData(params);
  }

  // Chest Report Data

  async loadChestReport() {
    const { fetchChestData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Chest",
    };

    //Redux Action call
    fetchChestData(params);
  }

  // Fat Report Data

  async loadFatReport() {
    const { fetchFatData } = this.props;

    const Id = await SecureStore.getItemAsync("id");
    const Token = await SecureStore.getItemAsync("access_token");

    const params = {
      current_user_id: Id,
      access_token: Token,
      report_type: "Fat",
    };

    //Redux Action call
    fetchFatData(params);
  }

  render() {
    const mark = {
      // [this.state.dateSelected]: {
      //   selected: true,
      //   customStyles: {
      //     container: {
      //       backgroundColor: "#102b46",
      //       borderWidth: 2,
      //       borderColor: "#f1c40e",
      //     },
      //     text: {
      //       color: "#fff",
      //     },
      //   },
      // },

      [today]: {
        selected: true,
        customStyles: {
          container: {
            backgroundColor: "#102b46",
            borderWidth: 2,
            borderColor: "#f1c40e",
          },
          text: {
            color: "#fff",
          },
        },
      },
    };

    const {
      collapsed,
      two_collapsed,
      three_collapsed,
      four_collapsed,
      five_collapsed,
      six_collapsed,
      seven_collapsed,
    } = this.state;

    const {
      weightData,
      weightLabel,
      weightUnit,
      waistData,
      waistLabel,
      waistUnit,
      thighData,
      thighLabel,
      thighUnit,
      armsData,
      armsLabel,
      armsUnit,
      heightData,
      heightLabel,
      heightUnit,
      chestData,
      chestLabel,
      chestUnit,
      fatData,
      fatLabel,
      fatUnit,
      loading,
    } = this.props;
    if (!loading) {
      return (
        <View style={styleCss.container}>
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity
                // onPress={() => this.props.navigation.navigate("CustomSideBar")}
                onPress={() => this.props.navigation.navigate("CustomSideBar")}
                style={styleCss.menu_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.dashboard_NaveBar_text_col}>
              <Text style={styleCss.NaveText}>{t("Dashboard")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Workouts")}
                style={styleCss.workout_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Workout-White.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Message")}
                style={styleCss.message_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Message-white.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <ScrollView
            refreshControl={
              <RefreshControl
                colors={["#102b46"]}
                refreshing={loading}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          >
            <Row style={styleCss.dashboard_menu_row}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Workouts")}
                style={styleCss.dashboard_workout_menu}
              >
                <Col style={styleCss.dashboard_workout_image_col}>
                  <Row style={styleCss.dashboard_workout_image_row}>
                    <Image
                      style={styleCss.dashboard_workout_image}
                      source={require("../../images/Workout-Blue-512.png")}
                    />
                  </Row>
                  <Row>
                    <Text style={styleCss.dashboard_workout_text}>
                      {t("Workouts")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Schedule")}
                style={styleCss.dashboard_schedule_menu}
              >
                <Col style={styleCss.dashboard_schedule_image_col}>
                  <Row style={styleCss.dashboard_schedule_image_row}>
                    <Image
                      style={styleCss.dashboard_schedule_image}
                      source={require("../../images/Class-Schedule-Blue-512.png")}
                    />
                  </Row>
                  <Row>
                    <Text style={styleCss.dashboard_schedule_text}>
                      {t("Class Schedule")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Booking")}
                style={styleCss.dashboard_booking_menu}
              >
                <Col style={styleCss.dashboard_booking_col}>
                  <Row style={styleCss.dashboard_booking_row}>
                    <Image
                      style={styleCss.dashboard_booking_image}
                      source={require("../../images/Date-blue-512.png")}
                    />
                  </Row>
                  <Row>
                    <Text style={styleCss.dashboard_booking_text}>
                      {t("Class Booking")}
                    </Text>
                  </Row>
                </Col>
              </TouchableOpacity>
            </Row>
            <Calendar
              monthFormat={"MMMM, yyyy"}
              markingType={"custom"}
              date={this.state.date}
              // onDayPress={(date) => {
              //   this.onDayPress(date);
              // }}
              markedDates={mark}
              theme={{
                textSectionTitleColor: "#b6c1cd",
                textSectionTitleDisabledColor: "#102b46",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "#102b46",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#102b46",
                indicatorColor: "#102b46",
                textDayFontFamily: "Poppins-Medium",
                textMonthFontFamily: "Poppins-SemiBold",
                textDayHeaderFontFamily: "Poppins-Medium",
                textDayFontSize: 13,
                textMonthFontSize: 17,
                textDayHeaderFontSize: 13,
              }}
            />
            
            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ collapsed: !this.state.collapsed })
                }
              >
                {collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Weight Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Weight Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}

                <CollapseBody>
                  {weightData !== "" && weightData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {weightUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: weightLabel,
                                datasets: [
                                  {
                                    data: weightData,
                                  },
                                ],
                              }}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.two_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ two_collapsed: !this.state.two_collapsed })
                }
              >
                {two_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Waist Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Waist Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody>
                  {waistData !== "" && waistData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {waistUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: waistLabel,
                                datasets: [
                                  {
                                    data: waistData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.three_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({
                    three_collapsed: !this.state.three_collapsed,
                  })
                }
              >
                {three_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Thigh Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Thigh Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}

                <CollapseBody>
                  {thighData !== "" && thighData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {thighUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: thighLabel,
                                datasets: [
                                  {
                                    data: thighData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                //   decimalPlaces: 1, // optional, defaults to 2dp
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.four_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ four_collapsed: !this.state.four_collapsed })
                }
              >
                {four_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Arms Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Arms Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}

                <CollapseBody>
                  {armsData !== "" && armsData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {armsUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: armsLabel,
                                datasets: [
                                  {
                                    data: armsData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.five_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ five_collapsed: !this.state.five_collapsed })
                }
              >
                {five_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Height Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Height Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}

                <CollapseBody>
                  {heightData !== "" && heightData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {heightUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: heightLabel,
                                datasets: [
                                  {
                                    data: heightData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.six_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({ six_collapsed: !this.state.six_collapsed })
                }
              >
                {six_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Chest Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Chest Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}

                <CollapseBody>
                  {chestData !== "" && chestData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {chestUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: chestLabel,
                                datasets: [
                                  {
                                    data: chestData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>

            <Col style={styleCss.dashboard_collapse_col}>
              <Collapse
                isCollapsed={this.state.seven_collapsed}
                onToggle={(isCollapsed) =>
                  this.setState({
                    seven_collapsed: !this.state.seven_collapsed,
                  })
                }
              >
                {seven_collapsed == true ? (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Fat Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/down-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                ) : (
                  <CollapseHeader>
                    <Row style={styleCss.dashboard_collapse_header_row}>
                      <Col style={styleCss.dashboard_collapse_header_col}>
                        <Text style={styleCss.dashboard_collapse_header_text}>
                          {t("Fat Progress Report")}
                        </Text>
                      </Col>
                      <Col style={styleCss.dashboard_collapse_header_two_col}>
                        <Image
                          style={styleCss.dashboard_collapse_header_image}
                          source={require("../../images/right-arrow.png")}
                        />
                      </Col>
                    </Row>
                  </CollapseHeader>
                )}
                <CollapseBody>
                  {fatData !== "" && fatData !== null ? (
                    <ScrollView
                      height={210}
                      horizontal={true}
                      contentOffset={{ x: 0, y: 0 }} // i needed the scrolling to start from the end not the start
                      showsHorizontalScrollIndicator={false} // to hide scroll bar
                    >
                      <CollapseBody style={styleCss.dashboard_collapse_body}>
                        <Row>
                          <Col>
                            <Row style={styleCss.dashboard_collapse_body_row}>
                              <Text
                                style={styleCss.dashboard_collapse_body_text}
                              >
                                {fatUnit}
                              </Text>
                            </Row>
                            <LineChart
                              data={{
                                labels: fatLabel,
                                datasets: [
                                  {
                                    data: fatData,
                                  },
                                ],
                              }}
                              // width={900}
                              withOuterLines={true}
                              width={normalize(700)}
                              height={120}
                              verticalLabelRotation={-0.1}
                              yAxisInterval={1} // optional, defaults to 1
                              chartConfig={{
                                backgroundColor: "#102B46",
                                backgroundGradientFrom: "#102B46",
                                backgroundGradientTo: "#102B46",
                                color: (opacity = 0) =>
                                  `rgb( 241, 196, 14)`,
                                labelColor: (opacity = 0) =>
                                  `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: {
                                  r: "0",
                                  strokeWidth: "0",
                                },
                                propsForBackgroundLines: {
                                  strokeWidth: 0,
                                },
                              }}
                              svg={{
                                stroke: "rgb(134, 65, 244)",
                              }}
                              bezier
                              labelStyle={{
                                color: "grey",
                                transform: [{ rotateX: "100deg" }],
                              }}
                              propsForLabels={{
                                fontFamily: "Poppins-Bold",
                              }}
                              style={styleCss.dashboard_line_chart}
                            />
                            <Row
                              style={styleCss.dashboard_collapse_body_two_row}
                            >
                              <Text
                                style={
                                  styleCss.dashboard_collapse_body_two_text
                                }
                              >
                                {t("Days")}
                              </Text>
                            </Row>
                          </Col>
                        </Row>
                      </CollapseBody>
                    </ScrollView>
                  ) : (
                    <View style={styleCss.dashboard_collapse_body_view}>
                      <Row style={styleCss.dashboard_collapse_body_three_row}>
                        <Text
                          style={styleCss.dashboard_collapse_body_three_text}
                        >
                          {t("Record not available")}
                        </Text>
                      </Row>
                    </View>
                  )}
                </CollapseBody>
              </Collapse>
            </Col>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styleCss.container}>
          <Row style={styleCss.NaveBar}>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("CustomSideBar")}
                style={styleCss.menu_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Menu-white.png")}
                />
              </TouchableOpacity>
            </Col>

            <Col style={styleCss.dashboard_NaveBar_text_col}>
              <Text style={styleCss.NaveText}>{t("Dashboard")}</Text>
            </Col>

            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Workouts")}
                style={styleCss.workout_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Workout-White.png")}
                />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Message")}
                style={styleCss.message_col}
              >
                <Image
                  style={styleCss.Naveicon}
                  source={require("../../images/Message-white.png")}
                />
              </TouchableOpacity>
            </Col>
          </Row>
          <ActivityIndicator
            style={styleCss.loading}
            size="large"
            color="#102b46"
          />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    weightData: state.dashboard.weightData,
    weightLabel: state.dashboard.weightLabel,
    weightUnit: state.dashboard.weightUnit,
    waistData: state.dashboard.waistData,
    waistLabel: state.dashboard.waistLabel,
    waistUnit: state.dashboard.waistUnit,
    thighData: state.dashboard.thighData,
    thighLabel: state.dashboard.thighLabel,
    thighUnit: state.dashboard.thighUnit,
    armsData: state.dashboard.armsData,
    armsLabel: state.dashboard.armsLabel,
    armsUnit: state.dashboard.armsUnit,
    heightData: state.dashboard.heightData,
    heightLabel: state.dashboard.heightLabel,
    heightUnit: state.dashboard.heightUnit,
    chestData: state.dashboard.chestData,
    chestLabel: state.dashboard.chestLabel,
    chestUnit: state.dashboard.chestUnit,
    fatData: state.dashboard.fatData,
    fatLabel: state.dashboard.fatLabel,
    fatUnit: state.dashboard.fatUnit,
    loading: state.dashboard.loading,
  };
};

const mapDispatchToProps = {
  fetchWeightData,
  fetchWaistData,
  fetchThighData,
  fetchArmsData,
  fetchHeightData,
  fetchChestData,
  fetchFatData,
  loadingStart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
