// ==UserScript==
// @name japanesify
// @description Convert Arabic numbers to Japanese numerals.
// @version 1.0
// @author jonkerz
// @license MIT
// @include *
// @run-at document-end
// @grant none
// ==/UserScript==

// See https://en.wikipedia.org/wiki/Japanese_numerals
var japaneseNumerals = {
  0: { kanji: "〇", on: "rei" },
  1: { kanji: "一", on: "ichi" },
  2: { kanji: "二", on: "ni" },
  3: { kanji: "三", on: "san" },
  4: { kanji: "四", on: "shi" },
  5: { kanji: "五", on: "go" },
  6: { kanji: "六", on: "roku" },
  7: { kanji: "七", on: "shichi" },
  8: { kanji: "八", on: "hachi" },
  9: { kanji: "九", on: "ku" }
}

function translateTree(startNode) {
  var items = document.evaluate("descendant::*", startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

  for (var i = 0; i < items.snapshotLength; i++) {
    var e = items.snapshotItem(i);

    for (var j = 0; j < e.childNodes.length; j++) {
      var elem = e.childNodes[j]

      if (elem.nodeType == Node.TEXT_NODE) {
        // Do not convert content in scripts.
        if (['SCRIPT', 'STYLE'].indexOf(elem.parentElement.tagName) >= 0) {
          continue
        }

        var text = translate(elem.wholeText)
        if (text !== undefined) {
          elem.nodeValue = text
        }
      }
    }
  }

  document.title = translate(document.title)
}

function translate(text) {
  return text.replace(/(\d+)/ig, arabicToJapanese)
}

function arabicToJapanese(string) {
  var newString = ''
  for (var x = 0; x < string.length; x++) {
    var c = string.charAt(x);
    newString += japaneseNumerals[parseInt(c)].kanji
  }

  return newString
}

translateTree(document.body)
