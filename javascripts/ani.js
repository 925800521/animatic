var _animatic_Objects=[];var _animatic_Attributes=[];function stopAllAnimation(){_animatic_Objects=[];_animatic_Attributes=[]}function animate(f,d,e,g){var c=g||0.25;if(f[d] instanceof Array){for(var b=0;b<f[d].length;b++){var a=new Object();a._object=f;a._attr=""+d;a["_item_"+b]=f[d][b];animatorFn=_animatic_runner(c,f[d][b],e[b]);_animatic_animateWithAnimator(a,"_item_"+b,animatorFn)}}else{animatorFn=_animatic_runner(c,f[d],e);_animatic_animateWithAnimator(f,d,animatorFn)}}function rotate(b,a,c){animatorFn=_animatic_rotator(60/c);_animatic_animateWithAnimator(b,a,animatorFn)}function drift(f,m,l,g,e,k){var d=l||100;var b=e||window.innerWidth;var a=k||window.innerHeight;var c=g;if(c==null){c=true}var h="y";if(f.top){h="top"}animatorFn=_animatic_drifterY(d,f[h],m,c,a);_animatic_animateWithAnimator(f,h,animatorFn);var j="x";if(f.left){j="left"}animatorFn=_animatic_drifterX(d,f[j],m,c,b);_animatic_animateWithAnimator(f,j,animatorFn)}function stopAnimation(f,c){var e=c||"";for(var d=_animatic_Objects.length-1;d>=0;d--){var g=_animatic_Objects[d];var b=_animatic_Attributes[d];if((g==f)&&((b==e)||(e=""))){_animatic_Objects.splice(d,1);_animatic_Attributes.splice(d,1)}}}function _animatic_animateWithAnimator(f,e,d){f["animatic_"+e]=d;for(var c=_animatic_Objects.length-1;c>=0;c--){var g=_animatic_Objects[c];var b=_animatic_Attributes[c];if((g==f)&&(b==e)){_animatic_Objects.splice(c,1);_animatic_Attributes.splice(c,1)}}_animatic_Objects.push(f);_animatic_Attributes.push(e)}setInterval(function(){_animatic_updateAll()},10);function _animatic_updateAll(){for(i in _animatic_Objects){var obj=_animatic_Objects[i];var attrName=_animatic_Attributes[i];var units=_animatic_unitsFor(obj[attrName]);var newValue=obj["animatic_"+attrName]();if(attrName.match("^_item_")=="_item_"){var origObject=obj._object;var origAttr=obj._attr;var origIndex=eval(attrName.substring(6));origObject[origAttr][eval(origIndex)]=_animatic_addUnitsTo(""+newValue,units)}else{obj[attrName]=_animatic_addUnitsTo(""+newValue,units)}}}function _animatic_stripUnits(a){return(""+a).replace(/[a-z%]/ig,"")}function _animatic_unitsFor(a){return(""+a).replace(/[0-9.-]+/ig,"?")}function _animatic_addUnitsTo(s,u){if(u=="?"){return eval(s)}if(u.match(/\?.+\?/)){throw"Animatic cannot animate an attribute with multiple parameters"}return u.replace(/\?/ig,""+s)}function _animatic_now(){return(new Date()).valueOf()}function _animatic_runner(p,fromValue,toValue){var v1=eval(_animatic_stripUnits(fromValue+""));var v2=eval(_animatic_stripUnits(toValue+""));var now=_animatic_now();var then=now+(p*1000);function counterClosure(){var justNow=_animatic_now();if(justNow>=then){return v2}var prop=(justNow-now)/(then-now);var currently=v1+(Math.sin(prop*Math.PI/2)*(v2-v1));return currently}return counterClosure}function _animatic_drifterX(speedValue,startXValue,headingValue,wrap,maxXValue){var speed=speedValue;var startX=eval(_animatic_stripUnits(startXValue+""));var heading=eval(_animatic_stripUnits(headingValue+""));var maxX=eval(_animatic_stripUnits(maxXValue+""));var now=_animatic_now();function counterClosure(){var justNow=_animatic_now();var diff=(justNow-now);var cx=startX+diff*speed*Math.sin(heading*Math.PI/180)/1000;if(wrap){while(cx<0){cx=cx+maxX}if(cx>maxX){cx=cx%maxX}}return cx}return counterClosure}function _animatic_drifterY(speedValue,startYValue,headingValue,wrap,maxYValue){var speed=speedValue;var startY=eval(_animatic_stripUnits(startYValue+""));var heading=eval(_animatic_stripUnits(headingValue+""));var maxY=eval(_animatic_stripUnits(maxYValue+""));var now=_animatic_now();function counterClosure(){var justNow=_animatic_now();var diff=(justNow-now);var cy=startY-diff*speed*Math.cos(heading*Math.PI/180)/1000;if(wrap){while(cy<0){cy=cy+maxY}if(cy>maxY){cy=cy%maxY;now=now+((maxYValue-startY)/speed)}}return cy}return counterClosure}function _animatic_rotator(c){var b=_animatic_now();var e=b+(Math.abs(c)*1000);var a=(c<0)?-1:1;function d(){var f=_animatic_now();if(f>=e){b=f;e=b+(Math.abs(c)*1000)}var g=(f-b)/(e-b);return a*g*360}return d}function _animatic_springer(c,a,e){var b=_animatic_rotator(c);function d(){return e*(Math.sin(b()*Math.PI/180)+a)}return d};