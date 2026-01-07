function getid(id)
{
   return document.getElementById(id);
}
var anndelay = 3000;
var anncount = 0;
var annheight = 24;
var annst = 0;


function lnkannouncementScroll()
{
   if( ! annst)
   {
      getid('linkdata').innerHTML += '<div style="height:3px;"></div>'+getid('linkdata').innerHTML;
      getid('linkdata').scrollTop = 0;
      if(getid('linkdata').scrollHeight > annheight * 3)
      {
         annst = setTimeout('lnkannouncementScroll()', anndelay);
      }
      else
      {
         getid('linkdiv').onmouseover = getid('linkdiv').onmouseout = null;
      }
      return;
   }
   if(anncount == annheight)
   {
      if(getid('linkdata').scrollHeight - annheight <= getid('linkdata').scrollTop)
      {
         getid('linkdata').scrollTop = getid('linkdata').scrollHeight / 2 - annheight;
      }
      anncount = 0;
      annst = setTimeout('lnkannouncementScroll()', anndelay);
   }
   else
   {
      getid('linkdata').scrollTop ++ ;
      anncount ++ ;
      annst = setTimeout('lnkannouncementScroll()', 10);
   }
}
lnkannouncementScroll();