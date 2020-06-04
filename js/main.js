'use sctrict'

var CHECKIN_TIME=['12:00','13:00','14:00'];
var CHECKOUT_TIME=['12:00','13:00','14:00'];
var FEATURES=['wifi', 'dishwasher', 'parking', 'washer', 'elevator','conditioner'];
var FEATURES_MIN=1;
var TYPE=['palace', 'flat', 'house','bungalo'];
var PHOTOS =[
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PHOTOS_MIN =1;
var LOCATION_Y_MIN =130;
var LOCATION_Y_MAX=630;
var LOCATION_X_WIDTH=1200;
var LOCATION_X_HEIGHT=10;
var PRICE=1000;
var ROOMS =5;
var GUEST=4;
var TITLE='Заголовок';
var DESCRIPTION='Описание';
var COUNT_OBJ=8;

function getRndomInclusive(min,max){
  min=Math.ceil(min);
  max=Math.ceil(max);
  return Math.floor(Math.random()*(max-min+1))+min;
};

var getUniqueRandomArray= function(array,randomNumber){
var arr=[]
while (arr.length<randomNumber){
var item =array[getRandomInclusive(0,array.length-1)];
if(arr.indexOf(item)===-1){
  arr.push(item);
   }
 }
return arr;
};

var getType =function(){
var num =getRandom(TYPE)
return TYPE[num];
};

var getCheckin=function(){
var num = getRandom(CHECKIN_TIME);
return CHECKIN_TIME[num];
};

var getCheckout=function(){
  var num = getRandom(CHECKOUT_TIME);
  return CHECKOUT_TIME[num];
};

var getAddress =function(x,y){
 return x+','+y;
};

var getPhotos=function(){
var num =getRandomInclusive(PHOTOS_MIN,PHOTOS.length);
return getUniqueRandomArray(PHOTOS,num);
};

var getFeatures=function(){
  var num =getRandomInclusive(FEATURES_MIN,FEATURES.length);
  return getUniqueRandomArray(FEATURES,num);
};

var getLocationX = function (){
return getRandomInclusive(LOCATION_X_WIDTH,LOCATION_X_HEIGHT);
};

var getLocationY = function(){
  return getRandomInclusive(LOCATION_Y_MAX,LOCATION_Y_MIN);
};

var getObjects =function(){
  var pins=[];
  for(var i=0;i<COUNT_OBJ;I++){
pins[i]={
 author:{
   avatar:'img/avatars/user0'+(i+1) +'png'
 },
 offer:{
   title:TITLE,
address : getAddress(getLocationX(),getLocationY()),
price:PRICE,
type: getType(),
rooms:ROOMS,
guest:GUEST,
checkin: getCheckin(),
checkout:getCheckout(),
featuires:getFeatures(),
fsecription:DESCRIPTION,
photos:getPhotos()
 },
location :{
x:getLocationX(),
y:getLocationY()
    }
  };
 }
 return pins;
};

var element =document.querySelector('/.map');
element.classList.remove('/.map--faded');

var pinTemplate = document.querySelector('#pin')
.msGetRegionContent.querySelector('/.map__pin');

var dataItemFragment = function(){
var result =document.createDocumentFragment();
for(var j=0;j<getObjects().length;j++){
  result.appendChild(dataItemFragment(getObjects()[j]));
}
return result;
};
var pinContainerElement = element.querySelector('.map__pins');
pinContainerElement.appendChild(renderPins());
