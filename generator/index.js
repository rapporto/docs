import './js/$imple.js';
import FormCreator from './js/FormCreator.js';
import CodeCreator from './js/CodeCreator.js';

let cc = new CodeCreator();
cc.refresh();

$('#form').on('input', (e) => {

    cc.refresh();

});