document.addEventListener("DOMContentLoaded", function() {
    // Находит все текстовые узлы на странице
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let currentNode;

    while (currentNode = textNodes.nextNode()) {
        // Заменяет все вхождения "&" на пустую строку
        currentNode.nodeValue = currentNode.nodeValue.replace(/&/g, '');
    }
});
