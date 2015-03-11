// Global Properties _________________________________________________________
var elementsHTML = 'html,head,title,base,link,meta,style,script,noscript,body,article,nav,aside,section,header,footer,h1,h2,h3,h4,h5,h6,hgroup,address,p,hr,pre,blockquote,ol,ul,li,dl,dt,dd,figure,figcaption,div,table,caption,thead,tbody,tfoot,tr,th,td,col,colgroup,form,fieldset,legend,label,input,button,select,datalist,optgroup,option,textarea,keygen,output,progress,meter,details,summary,command,menu,del,ins,img,iframe,embed,object,param,video,audio,source,canvas,track,map,area,a,em,strong,i,b,u,s,small,abbr,q,cite,dfn,sub,sup,time,code,kbd,samp,var,mark,bdi,bdo,ruby,rt,rp,span,br,wbr',
    elementsCSS = 'background,background-attachment,background-color,background-image,background-position,background-repeat,border,border-collapse,border-color,border-spacing,border-style,border-width,bottom,caption-side,clear,clip,color,content,counter-increment,counter-reset,cursor,direction,display,empty-cells,float,font,font-family,font-size,font-style,font-variant,font-weight,height,left,letter-spacing,line-height,list-style,list-style-image,list-style-position,list-style-type,margin,max-height,max-width,min-height,min-width,orphans,outline,outline-color,outline-style,outline-width,overflow,padding,page-break-after,page-break-before,page-break-inside,position,quotes,right,table-layout,text-align,text-decoration,text-indent,text-transform,top,unicode-bidi,vertical-align,visibility,white-space,widows,width,word-spacing,z-index',
    elementsArr, intro, quiz, outro, inputHtml, index, input, score, rightAnswersContainer, scoreHTML, scoreContainer, unansweredContainer, maxScoreContainer, gotAllContainer, progressBar, count, i, interval, remaining;

function buildQuiz() {
    intro = $('#intro');
    quiz = $('#quiz');
    outro = $('#outro');
    input = $('#answer-input');
    rightAnswersContainer = $('#right-answers');
    score = 0;
    count = 300;
    scoreContainer = $('#score');
    unansweredContainer = $('#unanswered');
    maxScoreContainer = $('#max-score');
    gotAllContainer = $('#got-all');
    progressBar = $('progress');
    remaining = $('#answers-left');
    quiz.hide();
    outro.hide();
}

function onHTMLBtnClick() {
    elementsArr = elementsHTML.split(',');
    intro.hide();
    quiz.show();
    countdownStart();
    input.keyup(wordChecker);
    maxScoreContainer.html(elementsArr.length * 100);
}

function onCSSBtnClick() {
    elementsArr = elementsCSS.split(',');
    intro.hide();
    quiz.show();
    countdownStart();
    input.keyup(wordChecker);
    maxScoreContainer.html(elementsArr.length * 100);
}

function wordChecker() {
    for (i = 0; i < elementsArr.length; i++) {
        if ($(this).val() === elementsArr[i]) {
            rightAnswersContainer.append('<li>' + $(this).val() + '</li>');
            index = elementsArr.indexOf($(this).val());
            elementsArr.splice(index, 1);
            input.val('');
            score++;
            remaining.html(elementsArr.length);
        }
    }
    if (elementsArr.length === 0) {
        quiz.remove();
        gotAllContainer.hide();
        finalScore();
    }
}

function countdownStart() {
    var interval = setInterval(function () {
        count--;
        progressBar.attr('value', count);
        if (count === 0) {
            clearInterval(interval);
            finalScore();
        }
    }, 1000);
}

function finalScore() {
    quiz.hide();
    $("#tweet").attr('href', 'https://twitter.com/intent/tweet?text=I scored ' + score * 100 + ' on HTML5 and CSS3 quiz! at http://littera.bg/htmlcssquiz/')
    outro.show();
    scoreContainer.html(score * 100);
    unansweredContainer.append(elementsArr.join('  <span class="line">|</span>  '));

    $("#play-again-button").on("click", reloadPage);
}

function reloadPage() {
    location.reload();
}

$(document).ready(function () {
    buildQuiz();
    $('#start-html-button').on('click', onHTMLBtnClick);
    $('#start-css-button').on('click', onCSSBtnClick);
    $('#give-up-button').on('click', finalScore);
    $('#bg-lang').on('click', function () {
        window.location.href = 'index-BG.html'
    });
    $('#en-lang').on('click', function () {
        window.location.href = 'index-EN.html'
    });

});
