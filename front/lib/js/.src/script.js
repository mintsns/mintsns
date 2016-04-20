/**!
 * @license JavaScript for MintSNS by YukiTANABE | pm8.jp
 */
(function($){
 var $window=$(window);
 var $articleCommentArr = $('article.comment');
 var $console = $('#console>input');
 var $help = $('#help');
 $window.on({
  'load': function(){
   fix();
  },
  'resize':function(){
   resized();
  },
  'keydown':function(e){
   var tElem=document.activeElement;
   var tNode=$(tElem)[0].nodeName;
   var node=tNode.toLowerCase();
   if(node!='textarea'&&node!='input') {
    if(event.shiftKey){ //Shift + others
     if (e.keyCode == 191) {//Shift + '/' = '?'
      keyAct('question');
      return false;
     }
     if (e.keyCode == 186) {//Shift + ';' = ':'
      keyAct('colon');
      return false;
     }
    }else if (e.keyCode == 191) {// '/'
     keyAct('slash');
     return false;
    }
   }else{
    if(e.keyCode==27){ //esc
     tElem.blur();
    }
   }
  }
 });
 $('article.post section.main header>i.menu').on('click', function(){
  $(this).next('nav').toggleClass('active');
 });
 $help.find('a[role=button]').on('click',function(e){
   keyAct($(e.target).attr('data-act'));
 });
 function fix(){
  $help.hide();
  resized();
 }
 function resized(){
  fixHeight($articleCommentArr);
 }
 function keyAct(e){
  var tElem=document.activeElement;
  switch(e){
   case 'question': //handle when '?'
    $help.toggle();
    break;
   case 'colon': //handle when ':'
    focus($console);
    break;
   case 'slash': //handle when '/'
    focus($console);
    break;
  }
 }
 function fixHeight(elems){
 elems.each(function(e){
   var h = $(this).find('.detail').outerHeight()+$(this).find('aside').outerHeight();
   $(this).css({'height':h});
  });
 }
 function focus(elem){
  elem.focus();
 }
})(jQuery);