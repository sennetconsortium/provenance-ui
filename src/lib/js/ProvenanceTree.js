import $ from 'jquery'
import DataConverter from './DataConverter'

/**
 * @author dbmi.pitt.edu
 * @param d3 {object} The d3 library
 * @param selector {string} The selector of the canvas
 * @param _options {object} Set of options to pass
 * @returns {{}}
 * @constructor
 */
function ProvenanceTree(d3, selector, _options) {

    const $el = {
        canvas: d3.select(selector),
    }
    const canvasId = selector.slice(1)

    const models = {
        stratify: 'stratify',
        root: 'root'
    }

    let $info
    let $infoParent
    let dataKey;
    let allData;
    let positionData = {}
    let filteredData = {}
    let legendFilters = {}
    let treeWidth = 1
    let toggled = {
        has: false,
        original: true
    }

    const classNames = {
        info: 'c-provenance__info',
        infoMain: 'c-provenance__info__main',
        infoNode: 'c-provenance__info--node',
        infoRelation: 'c-provenance__info--relationship',
        infoCloseBtn: 'js-btn--close',
        hasZoom: 'has-zoom',
        links: {
            hidden: 'edgeLabels--hidden',
            labels: 'edgeLabels',
            paths: 'edgePaths'
        },
        hasDrag: 'has-drag',
        nodes: {
            glow: 'glow',
            main: 'main',
            text: 'text',
            image: 'image'
        },
        active: 'is-active'
    }
    const sz = {}
    let simulation
    let isInit = true
    const data = {}
    const options = {
        graphDepth: 0,
        zoomActivated: false,
        colorMap: {
            Sample: "#ebb5c8",
            Source: "#ffc255",
            Activity: "#f16766",
            Dataset: "#8ecb93",
            Publication: "#a556d9"
        },
        visitedNodes: new Set(),
        imageMapActions: {},
        imageMap: {},
        imagesMap: {},
        node: {
            append: 'text',
            radius: 15
        },
        propertyMap: {},
        initParentKey: DataConverter.KEY_P_ACT,
        propertyPrefixClear: '',
        reverseRelationships: true,
        keepPositionsOnDataToggle: false,
        displayEdgeLabels: true,
        edgeLabels: { used: 'USED', wasGeneratedBy: 'WAS_GENERATED_BY', fontSize: 9, offset: -2, print: true },
        highlight: [],
        iconMap: {},
        faIconMap: fontAwesomeIcons(),
        colors: colors(),
        totalTypes: 0,
        reverseEdgeLabels: true,
        idNavigate: {
            props: [],
            url: '',
            exclude: []
        },
        callbacks: {},
        hideElementId: true,
        nodeLabelProperty: 'text',
        theme: {
            colors: {
                glow: {
                  highlighted: '#0f0',
                  regular: '#6ac6ff'
                },
                nodeOutlineFill: undefined,
                relationship: '#a5abb6',
                gray: '#ced2d9',
                inactive: '#dddddd'
            }
        },
        infoPanelBeforeSvg: true
    }

    function init() {
        $.extend(options, _options)
        initImageMap()
        handleZoomActivation()
        data.stratify = options.data.stratify
        data.root = options.data.root
        if (!data.root && (data.stratify && !data.stratify.length)) {
            log('No data provided', _options, 'error')
        } else {
            clearCanvas()
        }
    }

    function handleZoomActivation() {

        if (options.zoomActivated) {
            enableZoom()
        } else {
            disableZoom()
        }

        $(selector).click((e)=> {
            enableZoom()
        })

        $(document).on('scroll', (e)=>{
            if (!isElementInViewport($(selector)[0])) {
                disableZoom()
            }
        })
    }

    function enableZoom() {
        options.zoomActivated = true
        $(selector).addClass(classNames.hasZoom)
        createZoom()
    }

    function disableZoom() {
        options.zoomActivated = false
        $(selector).removeClass(classNames.hasZoom)
        createZoom()
    }

    function isElementInViewport (el) {
        try {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
            );
        } catch (e) {
            console.error(e)
        }
    }

    function clearCanvas() {
        $el.canvas.html('')
        if (!options.displayEdgeLabels) {
            toggleEdgeLabels()
        }
        setUpSvg()
        allData = JSON.parse(JSON.stringify(data))
        isInit = true
        const d = loadData(data)
        if (options.initParentKey === DataConverter.KEY_P_ENTITY) {
            toggleData({filter: 'Activity', parentKey: options.initParentKey })
        } else {
            buildTree(d)
        }
    }

    function log(title, obj, fn = 'log', color = '#da8f55') {
        if ((window.location.host.indexOf('localhost') !== -1)) {
            console.log(`%c Provenance-UI: ${title}`, `background: #222; color: ${color}`)
            console[fn](obj)
        }
    }

    function getDrag() {

        function dragStarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.1).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragEnded(event, d) {
           if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return {dragStarted, dragged, dragEnded}
    }

    function drag() {

        const { dragStarted, dragged, dragEnded } = getDrag()

        return d3.drag()
            .on('start', dragStarted)
            .on('drag', dragged)
            .on('end', dragEnded);
    }

    function color() {
        return options.colors[options.colors.length * Math.random() << 0];
    }

    function colors() {
        return [
            '#68bdf6', // light blue
            '#6dce9e', // green #1
            '#faafc2', // light pink
            '#f2baf6', // purple
            '#ff928c', // light red
            '#fcea7e', // light yellow
            '#ffc766', // light orange
            '#405f9e', // navy blue
            '#a5abb6', // dark gray
            '#78cecb', // green #2,
            '#b88cbb', // dark purple
            '#ced2d9', // light gray
            '#e84646', // dark red
            '#fa5f86', // dark pink
            '#ffab1a', // dark orange
            '#fcda19', // dark yellow
            '#797b80', // black
            '#c9d96f', // pistacchio
            '#47991f', // green #3
            '#70edee', // turquoise
            '#ff75ea'  // pink
        ];
    }

    function fontAwesomeIcons() {
        return {'glass':'f000','music':'f001','search':'f002','envelope-o':'f003','heart':'f004','star':'f005','star-o':'f006','user':'f007','film':'f008','th-large':'f009','th':'f00a','th-list':'f00b','check':'f00c','remove,close,times':'f00d','search-plus':'f00e','search-minus':'f010','power-off':'f011','signal':'f012','gear,cog':'f013','trash-o':'f014','home':'f015','file-o':'f016','clock-o':'f017','road':'f018','download':'f019','arrow-circle-o-down':'f01a','arrow-circle-o-up':'f01b','inbox':'f01c','play-circle-o':'f01d','rotate-right,repeat':'f01e','refresh':'f021','list-alt':'f022','lock':'f023','flag':'f024','headphones':'f025','volume-off':'f026','volume-down':'f027','volume-up':'f028','qrcode':'f029','barcode':'f02a','tag':'f02b','tags':'f02c','book':'f02d','bookmark':'f02e','print':'f02f','camera':'f030','font':'f031','bold':'f032','italic':'f033','text-height':'f034','text-width':'f035','align-left':'f036','align-center':'f037','align-right':'f038','align-justify':'f039','list':'f03a','dedent,outdent':'f03b','indent':'f03c','video-camera':'f03d','photo,image,picture-o':'f03e','pencil':'f040','map-marker':'f041','adjust':'f042','tint':'f043','edit,pencil-square-o':'f044','share-square-o':'f045','check-square-o':'f046','arrows':'f047','step-backward':'f048','fast-backward':'f049','backward':'f04a','play':'f04b','pause':'f04c','stop':'f04d','forward':'f04e','fast-forward':'f050','step-forward':'f051','eject':'f052','chevron-left':'f053','chevron-right':'f054','plus-circle':'f055','minus-circle':'f056','times-circle':'f057','check-circle':'f058','question-circle':'f059','info-circle':'f05a','crosshairs':'f05b','times-circle-o':'f05c','check-circle-o':'f05d','ban':'f05e','arrow-left':'f060','arrow-right':'f061','arrow-up':'f062','arrow-down':'f063','mail-forward,share':'f064','expand':'f065','compress':'f066','plus':'f067','minus':'f068','asterisk':'f069','exclamation-circle':'f06a','gift':'f06b','leaf':'f06c','fire':'f06d','eye':'f06e','eye-slash':'f070','warning,exclamation-triangle':'f071','plane':'f072','calendar':'f073','random':'f074','comment':'f075','magnet':'f076','chevron-up':'f077','chevron-down':'f078','retweet':'f079','shopping-cart':'f07a','folder':'f07b','folder-open':'f07c','arrows-v':'f07d','arrows-h':'f07e','bar-chart-o,bar-chart':'f080','twitter-square':'f081','facebook-square':'f082','camera-retro':'f083','key':'f084','gears,cogs':'f085','comments':'f086','thumbs-o-up':'f087','thumbs-o-down':'f088','star-half':'f089','heart-o':'f08a','sign-out':'f08b','linkedin-square':'f08c','thumb-tack':'f08d','external-link':'f08e','sign-in':'f090','trophy':'f091','github-square':'f092','upload':'f093','lemon-o':'f094','phone':'f095','square-o':'f096','bookmark-o':'f097','phone-square':'f098','twitter':'f099','facebook-f,facebook':'f09a','github':'f09b','unlock':'f09c','credit-card':'f09d','feed,rss':'f09e','hdd-o':'f0a0','bullhorn':'f0a1','bell':'f0f3','certificate':'f0a3','hand-o-right':'f0a4','hand-o-left':'f0a5','hand-o-up':'f0a6','hand-o-down':'f0a7','arrow-circle-left':'f0a8','arrow-circle-right':'f0a9','arrow-circle-up':'f0aa','arrow-circle-down':'f0ab','globe':'f0ac','wrench':'f0ad','tasks':'f0ae','filter':'f0b0','briefcase':'f0b1','arrows-alt':'f0b2','group,users':'f0c0','chain,link':'f0c1','cloud':'f0c2','flask':'f0c3','cut,scissors':'f0c4','copy,files-o':'f0c5','paperclip':'f0c6','save,floppy-o':'f0c7','square':'f0c8','navicon,reorder,bars':'f0c9','list-ul':'f0ca','list-ol':'f0cb','strikethrough':'f0cc','underline':'f0cd','table':'f0ce','magic':'f0d0','truck':'f0d1','pinterest':'f0d2','pinterest-square':'f0d3','google-plus-square':'f0d4','google-plus':'f0d5','money':'f0d6','caret-down':'f0d7','caret-up':'f0d8','caret-left':'f0d9','caret-right':'f0da','columns':'f0db','unsorted,sort':'f0dc','sort-down,sort-desc':'f0dd','sort-up,sort-asc':'f0de','envelope':'f0e0','linkedin':'f0e1','rotate-left,undo':'f0e2','legal,gavel':'f0e3','dashboard,tachometer':'f0e4','comment-o':'f0e5','comments-o':'f0e6','flash,bolt':'f0e7','sitemap':'f0e8','umbrella':'f0e9','paste,clipboard':'f0ea','lightbulb-o':'f0eb','exchange':'f0ec','cloud-download':'f0ed','cloud-upload':'f0ee','user-md':'f0f0','stethoscope':'f0f1','suitcase':'f0f2','bell-o':'f0a2','coffee':'f0f4','cutlery':'f0f5','file-text-o':'f0f6','building-o':'f0f7','hospital-o':'f0f8','ambulance':'f0f9','medkit':'f0fa','fighter-jet':'f0fb','beer':'f0fc','h-square':'f0fd','plus-square':'f0fe','angle-double-left':'f100','angle-double-right':'f101','angle-double-up':'f102','angle-double-down':'f103','angle-left':'f104','angle-right':'f105','angle-up':'f106','angle-down':'f107','desktop':'f108','laptop':'f109','tablet':'f10a','mobile-phone,mobile':'f10b','circle-o':'f10c','quote-left':'f10d','quote-right':'f10e','spinner':'f110','circle':'f111','mail-reply,reply':'f112','github-alt':'f113','folder-o':'f114','folder-open-o':'f115','smile-o':'f118','frown-o':'f119','meh-o':'f11a','gamepad':'f11b','keyboard-o':'f11c','flag-o':'f11d','flag-checkered':'f11e','terminal':'f120','code':'f121','mail-reply-all,reply-all':'f122','star-half-empty,star-half-full,star-half-o':'f123','location-arrow':'f124','crop':'f125','code-fork':'f126','unlink,chain-broken':'f127','question':'f128','info':'f129','exclamation':'f12a','superscript':'f12b','subscript':'f12c','eraser':'f12d','puzzle-piece':'f12e','microphone':'f130','microphone-slash':'f131','shield':'f132','calendar-o':'f133','fire-extinguisher':'f134','rocket':'f135','maxcdn':'f136','chevron-circle-left':'f137','chevron-circle-right':'f138','chevron-circle-up':'f139','chevron-circle-down':'f13a','html5':'f13b','css3':'f13c','anchor':'f13d','unlock-alt':'f13e','bullseye':'f140','ellipsis-h':'f141','ellipsis-v':'f142','rss-square':'f143','play-circle':'f144','ticket':'f145','minus-square':'f146','minus-square-o':'f147','level-up':'f148','level-down':'f149','check-square':'f14a','pencil-square':'f14b','external-link-square':'f14c','share-square':'f14d','compass':'f14e','toggle-down,caret-square-o-down':'f150','toggle-up,caret-square-o-up':'f151','toggle-right,caret-square-o-right':'f152','euro,eur':'f153','gbp':'f154','dollar,usd':'f155','rupee,inr':'f156','cny,rmb,yen,jpy':'f157','ruble,rouble,rub':'f158','won,krw':'f159','bitcoin,btc':'f15a','file':'f15b','file-text':'f15c','sort-alpha-asc':'f15d','sort-alpha-desc':'f15e','sort-amount-asc':'f160','sort-amount-desc':'f161','sort-numeric-asc':'f162','sort-numeric-desc':'f163','thumbs-up':'f164','thumbs-down':'f165','youtube-square':'f166','youtube':'f167','xing':'f168','xing-square':'f169','youtube-play':'f16a','dropbox':'f16b','stack-overflow':'f16c','instagram':'f16d','flickr':'f16e','adn':'f170','bitbucket':'f171','bitbucket-square':'f172','tumblr':'f173','tumblr-square':'f174','long-arrow-down':'f175','long-arrow-up':'f176','long-arrow-left':'f177','long-arrow-right':'f178','apple':'f179','windows':'f17a','android':'f17b','linux':'f17c','dribbble':'f17d','skype':'f17e','foursquare':'f180','trello':'f181','female':'f182','male':'f183','gittip,gratipay':'f184','sun-o':'f185','moon-o':'f186','archive':'f187','bug':'f188','vk':'f189','weibo':'f18a','renren':'f18b','pagelines':'f18c','stack-exchange':'f18d','arrow-circle-o-right':'f18e','arrow-circle-o-left':'f190','toggle-left,caret-square-o-left':'f191','dot-circle-o':'f192','wheelchair':'f193','vimeo-square':'f194','turkish-lira,try':'f195','plus-square-o':'f196','space-shuttle':'f197','slack':'f198','envelope-square':'f199','wordpress':'f19a','openid':'f19b','institution,bank,university':'f19c','mortar-board,graduation-cap':'f19d','yahoo':'f19e','google':'f1a0','reddit':'f1a1','reddit-square':'f1a2','stumbleupon-circle':'f1a3','stumbleupon':'f1a4','delicious':'f1a5','digg':'f1a6','pied-piper-pp':'f1a7','pied-piper-alt':'f1a8','drupal':'f1a9','joomla':'f1aa','language':'f1ab','fax':'f1ac','building':'f1ad','child':'f1ae','paw':'f1b0','spoon':'f1b1','cube':'f1b2','cubes':'f1b3','behance':'f1b4','behance-square':'f1b5','steam':'f1b6','steam-square':'f1b7','recycle':'f1b8','automobile,car':'f1b9','cab,taxi':'f1ba','tree':'f1bb','spotify':'f1bc','deviantart':'f1bd','soundcloud':'f1be','database':'f1c0','file-pdf-o':'f1c1','file-word-o':'f1c2','file-excel-o':'f1c3','file-powerpoint-o':'f1c4','file-photo-o,file-picture-o,file-image-o':'f1c5','file-zip-o,file-archive-o':'f1c6','file-sound-o,file-audio-o':'f1c7','file-movie-o,file-video-o':'f1c8','file-code-o':'f1c9','vine':'f1ca','codepen':'f1cb','jsfiddle':'f1cc','life-bouy,life-buoy,life-saver,support,life-ring':'f1cd','circle-o-notch':'f1ce','ra,resistance,rebel':'f1d0','ge,empire':'f1d1','git-square':'f1d2','git':'f1d3','y-combinator-square,yc-square,hacker-news':'f1d4','tencent-weibo':'f1d5','qq':'f1d6','wechat,weixin':'f1d7','send,paper-plane':'f1d8','send-o,paper-plane-o':'f1d9','history':'f1da','circle-thin':'f1db','header':'f1dc','paragraph':'f1dd','sliders':'f1de','share-alt':'f1e0','share-alt-square':'f1e1','bomb':'f1e2','soccer-ball-o,futbol-o':'f1e3','tty':'f1e4','binoculars':'f1e5','plug':'f1e6','slideshare':'f1e7','twitch':'f1e8','yelp':'f1e9','newspaper-o':'f1ea','wifi':'f1eb','calculator':'f1ec','paypal':'f1ed','google-wallet':'f1ee','cc-visa':'f1f0','cc-mastercard':'f1f1','cc-discover':'f1f2','cc-amex':'f1f3','cc-paypal':'f1f4','cc-stripe':'f1f5','bell-slash':'f1f6','bell-slash-o':'f1f7','trash':'f1f8','copyright':'f1f9','at':'f1fa','eyedropper':'f1fb','paint-brush':'f1fc','birthday-cake':'f1fd','area-chart':'f1fe','pie-chart':'f200','line-chart':'f201','lastfm':'f202','lastfm-square':'f203','toggle-off':'f204','toggle-on':'f205','bicycle':'f206','bus':'f207','ioxhost':'f208','angellist':'f209','cc':'f20a','shekel,sheqel,ils':'f20b','meanpath':'f20c','buysellads':'f20d','connectdevelop':'f20e','dashcube':'f210','forumbee':'f211','leanpub':'f212','sellsy':'f213','shirtsinbulk':'f214','simplybuilt':'f215','skyatlas':'f216','cart-plus':'f217','cart-arrow-down':'f218','diamond':'f219','ship':'f21a','user-secret':'f21b','motorcycle':'f21c','street-view':'f21d','heartbeat':'f21e','venus':'f221','mars':'f222','mercury':'f223','intersex,transgender':'f224','transgender-alt':'f225','venus-double':'f226','mars-double':'f227','venus-mars':'f228','mars-stroke':'f229','mars-stroke-v':'f22a','mars-stroke-h':'f22b','neuter':'f22c','genderless':'f22d','facebook-official':'f230','pinterest-p':'f231','whatsapp':'f232','server':'f233','user-plus':'f234','user-times':'f235','hotel,bed':'f236','viacoin':'f237','train':'f238','subway':'f239','medium':'f23a','yc,y-combinator':'f23b','optin-monster':'f23c','opencart':'f23d','expeditedssl':'f23e','battery-4,battery-full':'f240','battery-3,battery-three-quarters':'f241','battery-2,battery-half':'f242','battery-1,battery-quarter':'f243','battery-0,battery-empty':'f244','mouse-pointer':'f245','i-cursor':'f246','object-group':'f247','object-ungroup':'f248','sticky-note':'f249','sticky-note-o':'f24a','cc-jcb':'f24b','cc-diners-club':'f24c','clone':'f24d','balance-scale':'f24e','hourglass-o':'f250','hourglass-1,hourglass-start':'f251','hourglass-2,hourglass-half':'f252','hourglass-3,hourglass-end':'f253','hourglass':'f254','hand-grab-o,hand-rock-o':'f255','hand-stop-o,hand-paper-o':'f256','hand-scissors-o':'f257','hand-lizard-o':'f258','hand-spock-o':'f259','hand-pointer-o':'f25a','hand-peace-o':'f25b','trademark':'f25c','registered':'f25d','creative-commons':'f25e','gg':'f260','gg-circle':'f261','tripadvisor':'f262','odnoklassniki':'f263','odnoklassniki-square':'f264','get-pocket':'f265','wikipedia-w':'f266','safari':'f267','chrome':'f268','firefox':'f269','opera':'f26a','internet-explorer':'f26b','tv,television':'f26c','contao':'f26d','500px':'f26e','amazon':'f270','calendar-plus-o':'f271','calendar-minus-o':'f272','calendar-times-o':'f273','calendar-check-o':'f274','industry':'f275','map-pin':'f276','map-signs':'f277','map-o':'f278','map':'f279','commenting':'f27a','commenting-o':'f27b','houzz':'f27c','vimeo':'f27d','black-tie':'f27e','fonticons':'f280','reddit-alien':'f281','edge':'f282','credit-card-alt':'f283','codiepie':'f284','modx':'f285','fort-awesome':'f286','usb':'f287','product-hunt':'f288','mixcloud':'f289','scribd':'f28a','pause-circle':'f28b','pause-circle-o':'f28c','stop-circle':'f28d','stop-circle-o':'f28e','shopping-bag':'f290','shopping-basket':'f291','hashtag':'f292','bluetooth':'f293','bluetooth-b':'f294','percent':'f295','gitlab':'f296','wpbeginner':'f297','wpforms':'f298','envira':'f299','universal-access':'f29a','wheelchair-alt':'f29b','question-circle-o':'f29c','blind':'f29d','audio-description':'f29e','volume-control-phone':'f2a0','braille':'f2a1','assistive-listening-systems':'f2a2','asl-interpreting,american-sign-language-interpreting':'f2a3','deafness,hard-of-hearing,deaf':'f2a4','glide':'f2a5','glide-g':'f2a6','signing,sign-language':'f2a7','low-vision':'f2a8','viadeo':'f2a9','viadeo-square':'f2aa','snapchat':'f2ab','snapchat-ghost':'f2ac','snapchat-square':'f2ad','pied-piper':'f2ae','first-order':'f2b0','yoast':'f2b1','themeisle':'f2b2','google-plus-circle,google-plus-official':'f2b3','fa,font-awesome':'f2b4'};
    }

    function typeToColor(cls) {
        let color = options.colorMap[cls];

        if (!color) {
            color = options.colors[options.totalTypes % options.colors.length];
            options.colorMap[cls] = color;
            options.totalTypes++;
        }

        return color;
    }

    function typeToDarkenColor(cls) {
        return d3.rgb(typeToColor(cls)).darker(1);
    }

    function createZoom() {
        if ($el.svg) {
            if (options.zoomActivated) {
                options.scaleExtent = [0.2, 5]
            } else {
                options.scaleExtent = [1, 1]
            }
            let zoom = d3.zoom()
                .scaleExtent(options.scaleExtent)
                .on('zoom', function(event) {
                    if (options.zoomActivated) {
                        $el.svgGroup.selectAll('.links, .nodes, .labels')
                            .attr('transform', event.transform);
                    }
                });
            options.zoom = zoom
            $el.svg.call(zoom)
        }
    }


    function buildLinks() {

        $el.link = $el.linksGroup
            .selectAll('line')
            .data(data.links)

        $el.link.exit().remove()

        $el.line = $el.link
            .enter()
            .append('line')

        $el.link = $el.link.merge($el.line)

        const className = (d) => {
            const set = new Set()
            set.add(d.source.data.className)
            set.add(d.target.data.className)
            return set.size ? Array.from(set).join(' ') : ''
        }
        $el.link
            .attr('class', d => {
                return 'link '+className(d)
            })
            .on('click', function(e, d) {
                updateInfo(d.data, false)
            })
            // .attr("d", d3.linkHorizontal()
            //     .x(d => d.x)
            //     .y(d => d.y))
            .attr('marker-end','url(#arrowhead)');


        // Makes path go along with the link by providing position for link labels
        $el.edgePaths = $el.labelsGroup.selectAll(`.${classNames.links.paths}`)
            .data(data.links)

        $el.edgePaths.exit().remove()

        $el.edgePathsEnter = $el.edgePaths
            .enter()
            .append('path')

        $el.edgePaths = $el.edgePaths.merge($el.edgePathsEnter)

        $el.edgePaths
            .attr('class', classNames.links.paths)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', (d, i) => classNames.links.paths + i + canvasId)
            .style('pointer-events', 'none')


        // Labels
        $el.edgeLabel = $el.labelsGroup.selectAll(`.${classNames.links.labels}`)
            .data(data.links)

        $el.edgeLabel.exit().remove()

        $el.labelEnter = $el.edgeLabel
            .enter()
            .append('text')
            .style('pointer-events', 'none')
            .attr('class', classNames.links.labels)
            .attr('id', (d, i) => classNames.links.labels + i + canvasId)
            .attr('font-size', options.edgeLabels.fontSize)
            .attr('fill', '#aaa')

        $el.labelEnter.append('textPath')
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            .attr('class', d => 'textPath ' + className(d))

        $el.edgeLabel = $el.edgeLabel.merge($el.labelEnter)

        // Update labels
        $el.edgeLabel.select('.textPath')
            .attr('class', d => 'textPath ' + className(d))
            .attr('xlink:href', (d, i) => `#${classNames.links.paths}` + i + canvasId)
            .text(d => {
                if (options.callbacks.onEdgeLabel) {
                    return runCallback('onEdgeLabel', d)
                } else {
                    if (options.edgeLabels.print) {
                        return (d.source.data.type === 'Entity' && toggled.original) ? options.edgeLabels.wasGeneratedBy : options.edgeLabels.used
                    } else {
                        return ''
                    }
                }
            })
    }

    function getTextToAppendToNode(d) {
        let text = icon(d) || getNodeText(d) || '';
        text = icon(d) ? '&#x' + text : text;
        const className = icon(d) ? ' icon' : getNodeText(d) ? ' has-label' : '';
        return {text, className};
    }

    function getNodeProp(d, prop) {
        try {
            return d[prop] || d.data[prop] || d.data.data[prop]
        } catch (e) {}
    }

    function getNodeProperties(d) {
        return getNodeProp(d, 'properties')
    }

    function getNodeText(d) {
        return getNodeProp(d, options.nodeLabelProperty)
    }

    function getNodeType(d) {
        return getNodeProp(d, 'type')
    }

    function getNodeCat(d) {
        return getNodeProp(d, 'subType')
    }

    function getNodeId(d) {
        return getNodeProp(d, 'id')
    }

    function icon(d) {
        let code;
        const subType = getNodeCat(d)

        if (options.faIconMap && options.node.append === 'icon') {
            if (options.iconMap[subType] && options.faIconMap[options.iconMap[subType]]) {
                code = options.faIconMap[options.iconMap[subType]];
            } else if (options.faIconMap[subType]) {
                code = options.faIconMap[subType];
            } else if (options.iconMap[subType]) {
                code = options.iconMap[subType];
            }
        }

        return code;
    }

    function appendTextToNode(node) {
        return node.append('text')
            .attr('class', function(d) {
                return `${classNames.nodes.text} ` + (getTextToAppendToNode(d).className);
            })
            .attr('fill', '#ffffff')
            .attr('font-size', function(d) {
                return icon(d) ? (options.node.radius + 'px') : '8px';
            })
            .attr('pointer-events', 'none')
            .attr('text-anchor', 'middle')
            .attr('y', function(d) {
                return icon(d) ? (parseInt(Math.round(options.node.radius * 0.32)) + 'px') : '4px';
            })
            .html(function(d) {
                return getTextToAppendToNode(d).text;
            });
    }

    function initImageMap() {
        let key, keys;

        for (key in options.imageMap) {
            if (options.imageMap.hasOwnProperty(key)) {
                keys = key.split('|');

                if (!options.imagesMap[keys[0]]) {
                    options.imagesMap[keys[0]] = [key];
                } else {
                    options.imagesMap[keys[0]].push(key);
                }
            }
        }
    }

    function fetchImage(d, ops) {
        fetch(image(d))
            .then(r => r.text())
            .then(svgXml => {
                const id = getNodeId(d)
                const toBase64 = (xml) => {
                    return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)))
                }

                const fillColor = getFillColor(d, ops)
                svgXml = svgXml.replace('$bgColor', fillColor)
                svgXml = svgXml.replace('$borderColor', d3.rgb(fillColor).darker(1))

                $(`#image--${id}--${ops.className}`).attr('href', toBase64(svgXml))

            })
            .catch(console.error.bind(console))
    }

    function getImageActions(d, ops) {
        const subType = getNodeCat(d)
        if (options.imageMap && options.imagesMap[subType]) {
            return propertyValueSearch(d, options.imagesMap[subType], options.imageMapActions)
        }
        return null
    }

    function getImageTypeClass(d, ops) {
        const actions = getImageActions(d, ops)
        return actions ? actions.type : ''
    }

    function getDefaultSize() {
        return options.node.radius * 2
    }

    function getImageHeight(d) {
        const actions = getImageActions(d)
        const sz = getDefaultSize()
        return actions ? actions.height || sz : sz
    }

    function getImageWidth(d) {
        const actions = getImageActions(d)
        const sz = getDefaultSize()
        return actions ? actions.width || sz : sz
    }

    function getImageType(d, ops) {
        let type = 'image'
        let actions = getImageActions(d, ops)
        const uri = 'http://www.w3.org/2000/svg'
        let node = document.createElementNS(uri, type)
        if (actions) {
            type = actions ? actions.type : 'image';
            node =  document.createElementNS(uri, type)
            if (actions.fn === 'append') {
                if (type === 'image') {
                    fetchImage(d, ops)
                } else {
                    node.classList.add(type)
                    for (let io of actions.data) {
                        const path = document.createElementNS(uri, io.tag || 'path')
                        if (io.draw && Array.isArray(io.draw)) {
                            for (let attr of io.draw) {
                                path.setAttribute(attr[0], attr[1])
                            }
                        } else {
                            path.setAttribute(io.property || 'd', io.draw)
                        }
                        node.append(path)
                    }
                }
            }
        }
        return {node, type, actions}
    }

    function image(d) {
        let img
        const subType = getNodeCat(d)
        if (options.imageMap) {
            img = propertyValueSearch(d, options.imagesMap[subType], options.imageMap)
        }

        return img;
    }

    function propertyValueSearch(d, imagesForLabel, dict) {
        let i, result, imgLevel, label, labelPropertyValue, property, value;

        if (imagesForLabel) {
            imgLevel = 0;
            const subType = getNodeCat(d)
            for (i = 0; i < imagesForLabel.length; i++) {
                labelPropertyValue = imagesForLabel[i].split('|');

                switch (labelPropertyValue.length) {
                    case 3:
                        value = labelPropertyValue[2];
                    /* falls through */
                    case 2:
                        property = labelPropertyValue[1];
                    /* falls through */
                    case 1:
                        label = labelPropertyValue[0];
                        break;
                    default:
                        break;
                }

                const properties = getNodeProperties(d)
                if (subType === label &&
                    (!property || properties[property] !== undefined) &&
                    (!value || properties[property] === value)) {
                    if (labelPropertyValue.length > imgLevel) {
                        result = dict[imagesForLabel[i]];
                        imgLevel = labelPropertyValue.length;
                    }
                }
            }
        }
        return result;
    }

    function getFillColor(d, ops) {
        const subType = getNodeCat(d)
        let fillColor = typeToColor(subType);
        const actions = getImageActions(d, ops)
        const id = getNodeId(d)
        if (actions) {
            const colors = options.theme.colors
            const glowColor = isHighlighted(d) ? colors.glow.highlighted : colors.glow.regular
            fillColor = ops.className === 'glow' ?  glowColor : (actions.color || fillColor)

            const $node = $(`${selector} #node--${id}`)
            if (!actions.showMain) {
                $node.find('circle.main').addClass('invisible')
            }

            if (!actions.showMainGlow) {
                $node.find('circle.glow').addClass('invisible')
            }
        }
        return fillColor;
    }

    function appendImageToNode(node, ops) {
        return node.append(d => getImageType(d, ops).node)
            .attr('class', d => `image ${ops.className} ${getImageTypeClass(d, ops)}`)
            .attr('id', d => `image--${getNodeId(d)}--${ops.className}`)
            .attr('xlink:href', d => image(d))
            .attr('fill', d => getFillColor(d, ops))
            .attr('stroke', d => typeToDarkenColor(getNodeCat(d)))
            .attr('height', d => icon(d) ? '24px': getImageHeight(d) + 'px')
            .attr('width', d => icon(d) ? '24px':  getImageWidth(d) + 'px');
    }

    function getHighlightClass(d, isNode = true) {
        let className = isNode ? 'node--' : 'rel--';

        for (let h of options.highlight) {
            if (h.id === getNodeId(d)) {
                className = className + 'highlighted';
                className += h.isSecondary ? 'is-secondary' : ''
                return className
            }
        }
        return ''
    }

    function isHighlighted(d) {
        return getHighlightClass(d).indexOf('highlighted') !== -1
    }

    function buildNodes() {
        options.graphDepth = 0
        const getDepth = (d) => {
            return d.depth
        }
        const childInfo = (d, i) => {
            const posY = (ci, mod) => {
                const k = (mod ? 12 : 20)
                const gDepth = (ci * k * d.depth)
                if (gDepth > options.graphDepth) {
                    options.graphDepth = gDepth
                }
                return gDepth
            }
            treeWidth = Math.max(treeWidth, (d.children ? d.children.length : 0))
            if (d.parent) {
                const children = d.parent.children;
                const id = d.data.id;
                const pId = d.parent.data.id;
                const pInfo = parentInfo[pId]
                const mod = pInfo ? pInfo.y : 0 // Use the parent's y position or 0
                const pDepth = pInfo ? (Math.min(pInfo.dx, pInfo.d) + 1) : getDepth(d)
                let x = 0
                treeWidth = Math.max(treeWidth, (children ? children.length : 0))
                for (let n of children) {
                    if (n.data.id === id) {
                        return {id, y: posY(x, mod) + mod, d: pDepth}
                    }
                    x++
                }
                // No children or (child not found / data corrupted)
                return {id, y: posY(0), d: pDepth}
            } else {
                // Root element
                return {id: null, y: posY(0), d: getDepth(d)}
            }
        }
        const parentInfo = {}
        data.nodes.forEach(function(d, i) {
            const pos = positionData[d.id]
            if (options.keepPositionsOnDataToggle && pos && !toggled.original) {
                d.y = pos.y
                d.x = pos.x
            } else {
                let ci = childInfo(d, i)
                d.y = ci.y
                const depth = ci.d
                d.x = 100 * depth + 300
                parentInfo[ci.id] = {y: ci.y, d: getDepth(d), dx: depth}
            }
        });
        // data.nodes.forEach(function(d, i) {
        //     d.x = sz.width/2 + i;
        //     d.y = 100*d.depth + 100;
        // })

        $el.node = $el.nodeGroup
            .selectAll('.node')
            .data(data.nodes)

        $el.node.exit()
            .remove()

        $el.nodeEnter = $el.node.enter()
            .append('g')
            .attr('id', d => `node--${getNodeId(d)}`)
            .on('click', function(e, d) {
                d.wasClicked = true
                options.visitedNodes.add(getNodeId(d))
                updateInfo(d.data, true)
                runCallback('onNodeClick', {event: e, node: d})
                $(`${selector} .${classNames.infoCloseBtn}`).fadeIn()
            })
            .call(drag())

        $el.nodeGlow = $el.nodeEnter.append('circle')
            .attr('class', classNames.nodes.glow)
            .attr('r', options.node.radius * 1.3)

        $el.nodeMain = $el.nodeEnter
            .append('circle')
            .attr('class', classNames.nodes.main)
            .attr('fill', d => typeToColor(getNodeCat(d)))
            .attr('stroke', d => typeToDarkenColor(getNodeCat(d)))
            .attr('r', options.node.radius)

        if (options.node.append) {
            if (options.node.append === 'text') {
                appendTextToNode($el.nodeEnter)
            }
            appendImageToNode($el.nodeEnter, {className: 'glow'})
            appendImageToNode($el.nodeEnter, {className: 'main'})
        }

        $el.node = $el.node.merge($el.nodeEnter)

        const getHoverClass = (d) => {
            const cat = getNodeCat(d)
            return (legendFilters[cat]) ? 'has-hover ' : ''
        }

        $el.node.attr('class', d => `node node--${getNodeCat(d)} ${getHoverClass(d)}${getHighlightClass(d)} ${d.data.className || ''} ${d.wasClicked || options.visitedNodes.has(getNodeId(d)) ? 'is-visited' : ''}`)
            .attr('id', d => `node--${getNodeId(d)}`)

        $el.node.select(`circle.${classNames.nodes.glow}`)
            .attr('class', classNames.nodes.glow)
            .style('fill', (d) => {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : typeToColor(getNodeCat(d));
            })
            .style('stroke', (d) => {
                return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : typeToDarkenColor(getNodeCat(d));
            })
            .append('title').text(d => getNodeCat(d))

        $el.node.select(`circle.${classNames.nodes.main}`)
            .attr('class', classNames.nodes.main)
            .attr('fill', d => typeToColor(getNodeCat(d)))
            .attr('stroke', d => typeToDarkenColor(getNodeCat(d)))
            .append('title').text(d => getNodeCat(d))

        $(`${selector} .${classNames.nodes.image}`).remove()
        appendImageToNode($el.node, {className: 'glow'})
        appendImageToNode($el.node, {className: 'main'})
    }

    function appendInfoPanel() {

        $el.info = options.infoPanelBeforeSvg ? $el.canvas.append('div').lower() : $el.canvas.append('div')
        $el.info.attr('class', classNames.info)


        $infoParent = $(selector).find(`.${classNames.info}`)

         const onInfoCloseBuild = () => {
             const c = runCallback('onInfoCloseBuild')
             return c ? c : '<i class="fa fa-times" aria-hidden="true"></i>'
         }

         $el.info.append('span')
             .attr('class', classNames.info + '--close ' + classNames.infoCloseBtn)
             .attr('style', 'display: none;')
             .attr('title', 'Close Info Panel')
             .html(onInfoCloseBuild())

        $(selector).on('click', `.${classNames.infoCloseBtn}`, (e) => {
            e.stopPropagation()
            clearInfo()
            runCallback('onInfoCloseClick', {event: e})
            $(e.currentTarget).hide()
        })

        $el.info = $el.info.append('div')
            .attr('class', classNames.infoMain);
         $info = $(selector).find(`.${classNames.infoMain}`)
    }

    function isValidURL(string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }

    function clearInfo() {
        $infoParent.removeClass(classNames.active)
        $info.removeClass(classNames.infoNode)
        $info.removeClass(classNames.infoRelation)
        $info.html('');
    }

    function updateInfo(d, isNode) {
        clearInfo()

        $infoParent.addClass(classNames.active)
        isNode ? $info.addClass(classNames.infoNode) : $info.removeClass(classNames.infoNode)
        !isNode ? $info.addClass(classNames.infoRelation) : $info.removeClass(classNames.infoRelation)
        $info.attr('data-id', getNodeId(d))
        const type = getNodeType(d)

        if (type) {
            appendInfoElement(d,'class', isNode, (type !== getNodeCat(d)) ? getNodeCat(d) : type);
        }

        if (!options.hideElementId) {
            appendInfoElement(d,'property', isNode, '&lt;id&gt;',  getNodeId(d));
        }

        const properties = getNodeProperties(d)
        if (properties) {
            Object.keys(properties).forEach(function(property) {
                let mapped = options.propertyMap[property] || property
                appendInfoElement(d,'property', isNode, mapped, JSON.stringify(properties[property]));
            });
        }
        runCallback('onAfterInfoUpdateBuild')
    }

    function appendInfoElement(d, cls, isNode, property, value) {
        const isNavigation =  options.idNavigate?.props[property]
        value = value ? value.toString().replaceAll('"', '') : value
        let formattedUrl = false;

        let href = '#';
        if (isNavigation && (options.idNavigate?.url || isNavigation.url) && !isNavigation.callback) {
            const label = getNodeCat(d) || 'Unknown'
            const excludeList = options.idNavigate.exclude[label]
            if (!excludeList || (excludeList &&
                excludeList.indexOf(property) === -1)) {
                formattedUrl = true;
                const url = isValidURL(value) ? value : options.idNavigate.url
                href = url.replace('{subType}', label.toLowerCase())
                href = href.replace('{id}', getNodeId(d))
                href = (isValidURL(value) && href.indexOf('://') === -1) ? '//' + href : href
            }
        } else {
            if (isNavigation && isNavigation.callback ) {
                const result = isNavigation.callback(d, property, value)
                href = result.href
                value = result.value || value
                if (result.href) {
                    formattedUrl = true
                }
            }
        }
        let elem = $el.info.append('span');
        let valueHtml = ''
        if (value) {
            valueHtml = !formattedUrl ? `: <span>${value}</span>` : `: <a href="${href}" target="_blank">${value} </a>`;
        }
        cls += ` ${property.replace(options.propertyPrefixClear, '')} cell`
        elem.attr('class', cls + (!formattedUrl ? ' flat' : ' link'))
            .html('<strong>' + property.replace(options.propertyPrefixClear, '') + '</strong>' + valueHtml );

        if (!value) {
            elem.style('background-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : (isNode ? typeToColor(property) : defaultColor());
            })
                .style('border-color', function(d) {
                    return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : (isNode ? typeToDarkenColor(property) : defaultDarkenColor());
                })
                .style('color', function(d) {
                    return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : '#fff';
                });
        }
    }

    function defaultColor() {
        return options.theme.colors.relationship;
    }

    function defaultDarkenColor() {
        return d3.rgb(options.theme.colors.gray).darker(1);
    }

    function initSimulation() {
        const getPos = (call = 'onCenterX', prop = 'clientWidth') => {
            let p = runCallback(call)
            if (!p) {
                return $el.svgGroup.node().parentElement[prop] / 2
            }
            return p
        }
        simulation = d3.forceSimulation(data.nodes)
            .alpha(0.5)
            //.force("link", d3.forceLink(data.links).id(d => d.depth).distance(20).strength(1))
            .force('charge', d3.forceManyBody().strength(1))
            .force('center', d3.forceCenter(getPos(), getPos('onCenterY','clientHeight')))
            //.force("x", d3.forceX())
            //.force('y', d3.forceY(20).strength(.2))
    }

    function updateSimulation() {
        simulation
            .nodes(data.nodes)

        simulation
            .alpha(.5)
            .alphaTarget(0)
            .restart()
    }

    function stratify(data, parentKey) {
        parentKey = parentKey || DataConverter.KEY_P_ACT
        let has = {}
        let x = 0;
        const root = d3.stratify()
            .id(function(d) {
                x++
                if (has[d.id]) {
                    return d.id + '~' + x
                } else {
                    has[d.id] = true
                    return d.id
                }

            })
            .parentId(function(d) { return d[parentKey] })
            (data)

        // Do a DFS and fix the duplicate graph ids back to their original form
        let stack = [root];
        let visited = {};
        visited[root.id] = true
        while (stack.length) {
            let n = stack.pop()
            n.id = n.id.split('~')[0]
            if (n.children && n.children.length){
                for (let c of n.children) {
                    if (!visited[c.id]) {
                        visited[c.id] = true
                        stack.push(c)
                    }
                }
            }
        }

        const descendants = root.descendants()
        const _links = root.links()
        let seen = {}
        let nodes = []
        let fixed = {}
        for (let d of descendants) {
            // Push what has not been seen
            if (!seen[d.id]) {
                seen[d.id] = d;
                nodes.push(d)
            } else {
                // Otherwise, find them in the relationships and reference the same object
                if (!fixed[d.id]) {
                    for (let l of _links) {
                        if (l.source.id === d.id) {
                            l.source = seen[d.id]
                        }

                        if (l.target.id === d.id) {
                            l.target = seen[d.id]
                        }
                    }
                    // We only want to fix once per node id for efficiency,
                    fixed[d.id] = true;
                }
            }
        }
        return {root, nodes, links: _links }
    }

    function loadData(data) {
        if (data.stratify) {
            dataKey = models.stratify
            return stratify(data.stratify)
        } else {
            dataKey = data.root ? models.root : null
            const root = data.root || data
            return {root}
        }
    }

    function resolveDataMethod(data, dataKey, parentKey) {
        if (dataKey === models.stratify) {
            buildTree(stratify(data, parentKey))
        } else {
            buildTree({root: data})
        }
    }

    function toggleEdgeLabels() {
        $(selector).toggleClass(classNames.links.hidden)
    }

    function toggleData(ops) {
        toggled.has = true
        const {filter, parentKey} = ops
        if (simulation) {
            simulation.stop()
        }

        let _data = dataKey ? allData[dataKey] : allData
        if (filter) {
            toggled.original = false
            if (filteredData[filter] === undefined) {
                filteredData[filter] = _data.filter((item) => item.type !== filter)
            }
            resolveDataMethod(filteredData[filter], dataKey, parentKey)
        } else {
            toggled.original = true
            resolveDataMethod(_data, dataKey, parentKey)
        }
    }

    function runCallback(callback, args) {
        if (options.callbacks[callback] && typeof options.callbacks[callback] === 'function') {
            return options.callbacks[callback]({$el, data, options, args})
        } else {
            return false
        }
    }

    function setUpSvg() {

        const isLgScreen = () => parseInt($el.canvas.style('width')) > 1024
        const getMargins = () => (isLgScreen() ? 100 : 50)

        const margin = {
            top: 20,
            right: getMargins(),
            bottom: 90,
            left: getMargins()
        }

        const sizes = runCallback('onSvgSizing', {isLgScreen, getMargins, sz, margin})
        sz.width = $(selector).width() - margin.left
        sz.height = $(selector).height() - margin.top

        if (sizes) {
            sz.width = sizes.width || sz.width
            sz.height = sizes.height || sz.height
        }

        $el.svg = $el.canvas.append('svg')
            .attr('width', sz.width)
            .attr('height', sz.height)

        runCallback('onBeforeBuild')

        $el.svgGroup = $el.svg
            .append('g')
            //.attr('transform', 'translate(' + (margin.left * 2) + ',' + (margin.top * 2) + ')')

        $el.svg.append('defs').append('marker')
            .attr('id','arrowhead')
            .attr('viewBox','-0 -5 10 10') // The bound of the SVG viewport for the current SVG fragment. Defines a coordinate system 10 wide and 10 high starting on (0, -5)
            .attr('refX', 30) // X coordinate for the reference point of the marker. If circle is bigger, this needs to be bigger.
            .attr('refY', 0)
            .attr('orient','auto')
            .attr('markerWidth', 8)
            .attr('markerHeight', 8)
            .attr('xoverflow','visible')
            .append('svg:path')
            .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
            .attr('fill', '#999')
            .style('stroke','none')

        $el.linksGroup = $el.svgGroup.append('g')
            .attr('class', 'links')
            .attr('stroke', '#999')
            .attr('stroke-opacity', 0.6)

        $el.labelsGroup = $el.svgGroup.append('g')
            .attr('class', 'labels')

        $el.nodeGroup = $el.svgGroup.append("g")
            .attr('class', 'nodes')
            .attr("stroke-width", 1.5)

        appendInfoPanel()
    }


    function updatePositions() {
        $el.link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        $el.node.select(`circle.${classNames.nodes.main}`)
            .attr("cx", d => {
                positionData[d.id] = positionData[d.id] || {}
                positionData[d.id].x = d.x
                return  d.x
            })
            .attr("cy", d => {
                positionData[d.id] = positionData[d.id] || {}
                positionData[d.id].y = d.y
                return d.y
            });

        $el.node.select(`circle.${classNames.nodes.glow}`)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        $el.node.select(`.${classNames.nodes.text}`)
            .attr("x", d => d.x)
            .attr("y", d => d.y);

        const getX = (d) => d.x - (getImageWidth(d)/2)

        const getY = (d) => d.y - (getImageHeight(d)/2)

        $el.node.select(`.${classNames.nodes.image}.main.g`)
            .attr("transform", d => `translate(${getX(d)}, ${getY(d)})`)

        $el.node.select(`.${classNames.nodes.image}.glow.g`)
            .attr("transform", d => `translate(${getX(d)}, ${getY(d)})`)

        $el.node.select(`.${classNames.nodes.image}.main`)
            .attr("x", d => getX(d))
            .attr("y", d => getY(d));

        $el.node.select(`.${classNames.nodes.image}.glow`)
            .attr("x", d => getX(d))
            .attr("y", d => getY(d));


        $el.edgePaths.attr('d', d => {
            if (options.reverseEdgeLabels) {
                return 'M ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset) + ' L ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset)
            } else {
                return 'M ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset) + ' L ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset)
            }
        })
    }

    function ticked() {
        simulation.on("tick", (e) => {
            // const ky = simulation.alpha()
            // data.links.forEach(function(d, i) {
            //     d.source.y += (d.source.depth * 70 - d.source.y) * 2 * ky;
            // })
            updatePositions()
        });
    }

    function reverseRelationships(links) {
        for (let l of links) {
            let temp = l.target
            l.target = l.source
            l.source = temp
        }
        return links
    }

    function buildTree(_data) {
        const { root, nodes, links } = _data
        const h = d3.hierarchy(root)

        const _links = links || h.links()
        data.links = options.reverseRelationships ? reverseRelationships(_links) : _links
        data.nodes = nodes || h.descendants()

        buildLinks()
        buildNodes()

        if (isInit) {
            isInit = false
            initSimulation()
        } else {
            updateSimulation()
        }
        ticked()
        createZoom()
        runCallback('onAfterBuild', _data)
        return $el.svg.node()
    }

    init()
    return {
        colorMap: options.colorMap,
        toggleData: toggleData,
        simulation,
        toggleEdgeLabels,
        legendFilters,
        treeWidth,
        buildTree,
        options,
        visitedNodes: options.visitedNodes,
        disableZoom,
        enableZoom
    }
}

export default ProvenanceTree