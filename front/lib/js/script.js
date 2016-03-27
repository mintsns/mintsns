/**!
 * @license JavaScript for MintSNS by YukiTANABE | pm8.jp
 */
(function($){
 var $window=$(window);
 var $articleCommentArr = $('article.comment');
 $window.on({
  'load': function(){
   fix();
  },
  'resize':function(){
   fix();
  }
 });
 function fix(){
  fixHeight($articleCommentArr);
 }
 function fixHeight(elems){
 elems.each(function(e){
   var h = $(this).find('.detail').outerHeight()+$(this).find('aside').outerHeight();
   $(this).css({'height':h});
  });
 }
})(jQuery);