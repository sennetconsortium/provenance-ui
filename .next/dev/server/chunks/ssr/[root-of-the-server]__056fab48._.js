module.exports = [
"[project]/src/lib/js/ProvenanceTree.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/DataConverter.js [ssr] (ecmascript)");
;
;
/**
 * @author dbmi.pitt.edu
 * @param d3 {object} The d3 library
 * @param selector {string} The selector of the canvas
 * @param _options {object} Set of options to pass
 * @returns {{}}
 * @constructor
 */ function ProvenanceTree(d3, selector, _options) {
    const $el = {
        canvas: d3.select(selector)
    };
    const canvasId = selector.slice(1);
    const models = {
        stratify: 'stratify',
        root: 'root'
    };
    let $info;
    let $infoParent;
    let dataKey;
    let allData;
    let positionData = {};
    let filteredData = {};
    let legendFilters = {};
    let treeWidth = 1;
    let toggled = {
        has: false,
        original: true
    };
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
    };
    const sz = {};
    let simulation;
    let isInit = true;
    const data = {};
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
        initParentKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT,
        propertyPrefixClear: '',
        reverseRelationships: true,
        keepPositionsOnDataToggle: false,
        displayEdgeLabels: true,
        edgeLabels: {
            used: 'USED',
            wasGeneratedBy: 'WAS_GENERATED_BY',
            fontSize: 9,
            offset: -2,
            print: true
        },
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
    };
    function init() {
        __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"].extend(options, _options);
        initImageMap();
        handleZoomActivation();
        data.stratify = options.data.stratify;
        data.root = options.data.root;
        if (!data.root && data.stratify && !data.stratify.length) {
            log('No data provided', _options, 'error');
        } else {
            clearCanvas();
        }
    }
    function handleZoomActivation() {
        if (options.zoomActivated) {
            enableZoom();
        } else {
            disableZoom();
        }
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).click((e)=>{
            enableZoom();
        });
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(document).on('scroll', (e)=>{
            if (!isElementInViewport((0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector)[0])) {
                disableZoom();
            }
        });
    }
    function enableZoom() {
        options.zoomActivated = true;
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).addClass(classNames.hasZoom);
        createZoom();
    }
    function disableZoom() {
        options.zoomActivated = false;
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).removeClass(classNames.hasZoom);
        createZoom();
    }
    function isElementInViewport(el) {
        try {
            const rect = el.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */ rect.right <= (window.innerWidth || document.documentElement.clientWidth);
        } catch (e) {
            console.error(e);
        }
    }
    function clearCanvas() {
        $el.canvas.html('');
        if (!options.displayEdgeLabels) {
            toggleEdgeLabels();
        }
        setUpSvg();
        allData = JSON.parse(JSON.stringify(data));
        isInit = true;
        const d = loadData(data);
        if (options.initParentKey === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY) {
            toggleData({
                filter: 'Activity',
                parentKey: options.initParentKey
            });
        } else {
            buildTree(d);
        }
    }
    function log(title, obj, fn = 'log', color = '#da8f55') {
        if (window.location.host.indexOf('localhost') !== -1) {
            console.log(`%c Provenance-UI: ${title}`, `background: #222; color: ${color}`);
            console[fn](obj);
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
        return {
            dragStarted,
            dragged,
            dragEnded
        };
    }
    function drag() {
        const { dragStarted, dragged, dragEnded } = getDrag();
        return d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded);
    }
    function colors() {
        return [
            '#68bdf6',
            '#6dce9e',
            '#faafc2',
            '#f2baf6',
            '#ff928c',
            '#fcea7e',
            '#ffc766',
            '#405f9e',
            '#a5abb6',
            '#78cecb',
            '#b88cbb',
            '#ced2d9',
            '#e84646',
            '#fa5f86',
            '#ffab1a',
            '#fcda19',
            '#797b80',
            '#c9d96f',
            '#47991f',
            '#70edee',
            '#ff75ea' // pink
        ];
    }
    function fontAwesomeIcons() {
        return {
            'glass': 'f000',
            'music': 'f001',
            'search': 'f002',
            'envelope-o': 'f003',
            'heart': 'f004',
            'star': 'f005',
            'star-o': 'f006',
            'user': 'f007',
            'film': 'f008',
            'th-large': 'f009',
            'th': 'f00a',
            'th-list': 'f00b',
            'check': 'f00c',
            'remove,close,times': 'f00d',
            'search-plus': 'f00e',
            'search-minus': 'f010',
            'power-off': 'f011',
            'signal': 'f012',
            'gear,cog': 'f013',
            'trash-o': 'f014',
            'home': 'f015',
            'file-o': 'f016',
            'clock-o': 'f017',
            'road': 'f018',
            'download': 'f019',
            'arrow-circle-o-down': 'f01a',
            'arrow-circle-o-up': 'f01b',
            'inbox': 'f01c',
            'play-circle-o': 'f01d',
            'rotate-right,repeat': 'f01e',
            'refresh': 'f021',
            'list-alt': 'f022',
            'lock': 'f023',
            'flag': 'f024',
            'headphones': 'f025',
            'volume-off': 'f026',
            'volume-down': 'f027',
            'volume-up': 'f028',
            'qrcode': 'f029',
            'barcode': 'f02a',
            'tag': 'f02b',
            'tags': 'f02c',
            'book': 'f02d',
            'bookmark': 'f02e',
            'print': 'f02f',
            'camera': 'f030',
            'font': 'f031',
            'bold': 'f032',
            'italic': 'f033',
            'text-height': 'f034',
            'text-width': 'f035',
            'align-left': 'f036',
            'align-center': 'f037',
            'align-right': 'f038',
            'align-justify': 'f039',
            'list': 'f03a',
            'dedent,outdent': 'f03b',
            'indent': 'f03c',
            'video-camera': 'f03d',
            'photo,image,picture-o': 'f03e',
            'pencil': 'f040',
            'map-marker': 'f041',
            'adjust': 'f042',
            'tint': 'f043',
            'edit,pencil-square-o': 'f044',
            'share-square-o': 'f045',
            'check-square-o': 'f046',
            'arrows': 'f047',
            'step-backward': 'f048',
            'fast-backward': 'f049',
            'backward': 'f04a',
            'play': 'f04b',
            'pause': 'f04c',
            'stop': 'f04d',
            'forward': 'f04e',
            'fast-forward': 'f050',
            'step-forward': 'f051',
            'eject': 'f052',
            'chevron-left': 'f053',
            'chevron-right': 'f054',
            'plus-circle': 'f055',
            'minus-circle': 'f056',
            'times-circle': 'f057',
            'check-circle': 'f058',
            'question-circle': 'f059',
            'info-circle': 'f05a',
            'crosshairs': 'f05b',
            'times-circle-o': 'f05c',
            'check-circle-o': 'f05d',
            'ban': 'f05e',
            'arrow-left': 'f060',
            'arrow-right': 'f061',
            'arrow-up': 'f062',
            'arrow-down': 'f063',
            'mail-forward,share': 'f064',
            'expand': 'f065',
            'compress': 'f066',
            'plus': 'f067',
            'minus': 'f068',
            'asterisk': 'f069',
            'exclamation-circle': 'f06a',
            'gift': 'f06b',
            'leaf': 'f06c',
            'fire': 'f06d',
            'eye': 'f06e',
            'eye-slash': 'f070',
            'warning,exclamation-triangle': 'f071',
            'plane': 'f072',
            'calendar': 'f073',
            'random': 'f074',
            'comment': 'f075',
            'magnet': 'f076',
            'chevron-up': 'f077',
            'chevron-down': 'f078',
            'retweet': 'f079',
            'shopping-cart': 'f07a',
            'folder': 'f07b',
            'folder-open': 'f07c',
            'arrows-v': 'f07d',
            'arrows-h': 'f07e',
            'bar-chart-o,bar-chart': 'f080',
            'twitter-square': 'f081',
            'facebook-square': 'f082',
            'camera-retro': 'f083',
            'key': 'f084',
            'gears,cogs': 'f085',
            'comments': 'f086',
            'thumbs-o-up': 'f087',
            'thumbs-o-down': 'f088',
            'star-half': 'f089',
            'heart-o': 'f08a',
            'sign-out': 'f08b',
            'linkedin-square': 'f08c',
            'thumb-tack': 'f08d',
            'external-link': 'f08e',
            'sign-in': 'f090',
            'trophy': 'f091',
            'github-square': 'f092',
            'upload': 'f093',
            'lemon-o': 'f094',
            'phone': 'f095',
            'square-o': 'f096',
            'bookmark-o': 'f097',
            'phone-square': 'f098',
            'twitter': 'f099',
            'facebook-f,facebook': 'f09a',
            'github': 'f09b',
            'unlock': 'f09c',
            'credit-card': 'f09d',
            'feed,rss': 'f09e',
            'hdd-o': 'f0a0',
            'bullhorn': 'f0a1',
            'bell': 'f0f3',
            'certificate': 'f0a3',
            'hand-o-right': 'f0a4',
            'hand-o-left': 'f0a5',
            'hand-o-up': 'f0a6',
            'hand-o-down': 'f0a7',
            'arrow-circle-left': 'f0a8',
            'arrow-circle-right': 'f0a9',
            'arrow-circle-up': 'f0aa',
            'arrow-circle-down': 'f0ab',
            'globe': 'f0ac',
            'wrench': 'f0ad',
            'tasks': 'f0ae',
            'filter': 'f0b0',
            'briefcase': 'f0b1',
            'arrows-alt': 'f0b2',
            'group,users': 'f0c0',
            'chain,link': 'f0c1',
            'cloud': 'f0c2',
            'flask': 'f0c3',
            'cut,scissors': 'f0c4',
            'copy,files-o': 'f0c5',
            'paperclip': 'f0c6',
            'save,floppy-o': 'f0c7',
            'square': 'f0c8',
            'navicon,reorder,bars': 'f0c9',
            'list-ul': 'f0ca',
            'list-ol': 'f0cb',
            'strikethrough': 'f0cc',
            'underline': 'f0cd',
            'table': 'f0ce',
            'magic': 'f0d0',
            'truck': 'f0d1',
            'pinterest': 'f0d2',
            'pinterest-square': 'f0d3',
            'google-plus-square': 'f0d4',
            'google-plus': 'f0d5',
            'money': 'f0d6',
            'caret-down': 'f0d7',
            'caret-up': 'f0d8',
            'caret-left': 'f0d9',
            'caret-right': 'f0da',
            'columns': 'f0db',
            'unsorted,sort': 'f0dc',
            'sort-down,sort-desc': 'f0dd',
            'sort-up,sort-asc': 'f0de',
            'envelope': 'f0e0',
            'linkedin': 'f0e1',
            'rotate-left,undo': 'f0e2',
            'legal,gavel': 'f0e3',
            'dashboard,tachometer': 'f0e4',
            'comment-o': 'f0e5',
            'comments-o': 'f0e6',
            'flash,bolt': 'f0e7',
            'sitemap': 'f0e8',
            'umbrella': 'f0e9',
            'paste,clipboard': 'f0ea',
            'lightbulb-o': 'f0eb',
            'exchange': 'f0ec',
            'cloud-download': 'f0ed',
            'cloud-upload': 'f0ee',
            'user-md': 'f0f0',
            'stethoscope': 'f0f1',
            'suitcase': 'f0f2',
            'bell-o': 'f0a2',
            'coffee': 'f0f4',
            'cutlery': 'f0f5',
            'file-text-o': 'f0f6',
            'building-o': 'f0f7',
            'hospital-o': 'f0f8',
            'ambulance': 'f0f9',
            'medkit': 'f0fa',
            'fighter-jet': 'f0fb',
            'beer': 'f0fc',
            'h-square': 'f0fd',
            'plus-square': 'f0fe',
            'angle-double-left': 'f100',
            'angle-double-right': 'f101',
            'angle-double-up': 'f102',
            'angle-double-down': 'f103',
            'angle-left': 'f104',
            'angle-right': 'f105',
            'angle-up': 'f106',
            'angle-down': 'f107',
            'desktop': 'f108',
            'laptop': 'f109',
            'tablet': 'f10a',
            'mobile-phone,mobile': 'f10b',
            'circle-o': 'f10c',
            'quote-left': 'f10d',
            'quote-right': 'f10e',
            'spinner': 'f110',
            'circle': 'f111',
            'mail-reply,reply': 'f112',
            'github-alt': 'f113',
            'folder-o': 'f114',
            'folder-open-o': 'f115',
            'smile-o': 'f118',
            'frown-o': 'f119',
            'meh-o': 'f11a',
            'gamepad': 'f11b',
            'keyboard-o': 'f11c',
            'flag-o': 'f11d',
            'flag-checkered': 'f11e',
            'terminal': 'f120',
            'code': 'f121',
            'mail-reply-all,reply-all': 'f122',
            'star-half-empty,star-half-full,star-half-o': 'f123',
            'location-arrow': 'f124',
            'crop': 'f125',
            'code-fork': 'f126',
            'unlink,chain-broken': 'f127',
            'question': 'f128',
            'info': 'f129',
            'exclamation': 'f12a',
            'superscript': 'f12b',
            'subscript': 'f12c',
            'eraser': 'f12d',
            'puzzle-piece': 'f12e',
            'microphone': 'f130',
            'microphone-slash': 'f131',
            'shield': 'f132',
            'calendar-o': 'f133',
            'fire-extinguisher': 'f134',
            'rocket': 'f135',
            'maxcdn': 'f136',
            'chevron-circle-left': 'f137',
            'chevron-circle-right': 'f138',
            'chevron-circle-up': 'f139',
            'chevron-circle-down': 'f13a',
            'html5': 'f13b',
            'css3': 'f13c',
            'anchor': 'f13d',
            'unlock-alt': 'f13e',
            'bullseye': 'f140',
            'ellipsis-h': 'f141',
            'ellipsis-v': 'f142',
            'rss-square': 'f143',
            'play-circle': 'f144',
            'ticket': 'f145',
            'minus-square': 'f146',
            'minus-square-o': 'f147',
            'level-up': 'f148',
            'level-down': 'f149',
            'check-square': 'f14a',
            'pencil-square': 'f14b',
            'external-link-square': 'f14c',
            'share-square': 'f14d',
            'compass': 'f14e',
            'toggle-down,caret-square-o-down': 'f150',
            'toggle-up,caret-square-o-up': 'f151',
            'toggle-right,caret-square-o-right': 'f152',
            'euro,eur': 'f153',
            'gbp': 'f154',
            'dollar,usd': 'f155',
            'rupee,inr': 'f156',
            'cny,rmb,yen,jpy': 'f157',
            'ruble,rouble,rub': 'f158',
            'won,krw': 'f159',
            'bitcoin,btc': 'f15a',
            'file': 'f15b',
            'file-text': 'f15c',
            'sort-alpha-asc': 'f15d',
            'sort-alpha-desc': 'f15e',
            'sort-amount-asc': 'f160',
            'sort-amount-desc': 'f161',
            'sort-numeric-asc': 'f162',
            'sort-numeric-desc': 'f163',
            'thumbs-up': 'f164',
            'thumbs-down': 'f165',
            'youtube-square': 'f166',
            'youtube': 'f167',
            'xing': 'f168',
            'xing-square': 'f169',
            'youtube-play': 'f16a',
            'dropbox': 'f16b',
            'stack-overflow': 'f16c',
            'instagram': 'f16d',
            'flickr': 'f16e',
            'adn': 'f170',
            'bitbucket': 'f171',
            'bitbucket-square': 'f172',
            'tumblr': 'f173',
            'tumblr-square': 'f174',
            'long-arrow-down': 'f175',
            'long-arrow-up': 'f176',
            'long-arrow-left': 'f177',
            'long-arrow-right': 'f178',
            'apple': 'f179',
            'windows': 'f17a',
            'android': 'f17b',
            'linux': 'f17c',
            'dribbble': 'f17d',
            'skype': 'f17e',
            'foursquare': 'f180',
            'trello': 'f181',
            'female': 'f182',
            'male': 'f183',
            'gittip,gratipay': 'f184',
            'sun-o': 'f185',
            'moon-o': 'f186',
            'archive': 'f187',
            'bug': 'f188',
            'vk': 'f189',
            'weibo': 'f18a',
            'renren': 'f18b',
            'pagelines': 'f18c',
            'stack-exchange': 'f18d',
            'arrow-circle-o-right': 'f18e',
            'arrow-circle-o-left': 'f190',
            'toggle-left,caret-square-o-left': 'f191',
            'dot-circle-o': 'f192',
            'wheelchair': 'f193',
            'vimeo-square': 'f194',
            'turkish-lira,try': 'f195',
            'plus-square-o': 'f196',
            'space-shuttle': 'f197',
            'slack': 'f198',
            'envelope-square': 'f199',
            'wordpress': 'f19a',
            'openid': 'f19b',
            'institution,bank,university': 'f19c',
            'mortar-board,graduation-cap': 'f19d',
            'yahoo': 'f19e',
            'google': 'f1a0',
            'reddit': 'f1a1',
            'reddit-square': 'f1a2',
            'stumbleupon-circle': 'f1a3',
            'stumbleupon': 'f1a4',
            'delicious': 'f1a5',
            'digg': 'f1a6',
            'pied-piper-pp': 'f1a7',
            'pied-piper-alt': 'f1a8',
            'drupal': 'f1a9',
            'joomla': 'f1aa',
            'language': 'f1ab',
            'fax': 'f1ac',
            'building': 'f1ad',
            'child': 'f1ae',
            'paw': 'f1b0',
            'spoon': 'f1b1',
            'cube': 'f1b2',
            'cubes': 'f1b3',
            'behance': 'f1b4',
            'behance-square': 'f1b5',
            'steam': 'f1b6',
            'steam-square': 'f1b7',
            'recycle': 'f1b8',
            'automobile,car': 'f1b9',
            'cab,taxi': 'f1ba',
            'tree': 'f1bb',
            'spotify': 'f1bc',
            'deviantart': 'f1bd',
            'soundcloud': 'f1be',
            'database': 'f1c0',
            'file-pdf-o': 'f1c1',
            'file-word-o': 'f1c2',
            'file-excel-o': 'f1c3',
            'file-powerpoint-o': 'f1c4',
            'file-photo-o,file-picture-o,file-image-o': 'f1c5',
            'file-zip-o,file-archive-o': 'f1c6',
            'file-sound-o,file-audio-o': 'f1c7',
            'file-movie-o,file-video-o': 'f1c8',
            'file-code-o': 'f1c9',
            'vine': 'f1ca',
            'codepen': 'f1cb',
            'jsfiddle': 'f1cc',
            'life-bouy,life-buoy,life-saver,support,life-ring': 'f1cd',
            'circle-o-notch': 'f1ce',
            'ra,resistance,rebel': 'f1d0',
            'ge,empire': 'f1d1',
            'git-square': 'f1d2',
            'git': 'f1d3',
            'y-combinator-square,yc-square,hacker-news': 'f1d4',
            'tencent-weibo': 'f1d5',
            'qq': 'f1d6',
            'wechat,weixin': 'f1d7',
            'send,paper-plane': 'f1d8',
            'send-o,paper-plane-o': 'f1d9',
            'history': 'f1da',
            'circle-thin': 'f1db',
            'header': 'f1dc',
            'paragraph': 'f1dd',
            'sliders': 'f1de',
            'share-alt': 'f1e0',
            'share-alt-square': 'f1e1',
            'bomb': 'f1e2',
            'soccer-ball-o,futbol-o': 'f1e3',
            'tty': 'f1e4',
            'binoculars': 'f1e5',
            'plug': 'f1e6',
            'slideshare': 'f1e7',
            'twitch': 'f1e8',
            'yelp': 'f1e9',
            'newspaper-o': 'f1ea',
            'wifi': 'f1eb',
            'calculator': 'f1ec',
            'paypal': 'f1ed',
            'google-wallet': 'f1ee',
            'cc-visa': 'f1f0',
            'cc-mastercard': 'f1f1',
            'cc-discover': 'f1f2',
            'cc-amex': 'f1f3',
            'cc-paypal': 'f1f4',
            'cc-stripe': 'f1f5',
            'bell-slash': 'f1f6',
            'bell-slash-o': 'f1f7',
            'trash': 'f1f8',
            'copyright': 'f1f9',
            'at': 'f1fa',
            'eyedropper': 'f1fb',
            'paint-brush': 'f1fc',
            'birthday-cake': 'f1fd',
            'area-chart': 'f1fe',
            'pie-chart': 'f200',
            'line-chart': 'f201',
            'lastfm': 'f202',
            'lastfm-square': 'f203',
            'toggle-off': 'f204',
            'toggle-on': 'f205',
            'bicycle': 'f206',
            'bus': 'f207',
            'ioxhost': 'f208',
            'angellist': 'f209',
            'cc': 'f20a',
            'shekel,sheqel,ils': 'f20b',
            'meanpath': 'f20c',
            'buysellads': 'f20d',
            'connectdevelop': 'f20e',
            'dashcube': 'f210',
            'forumbee': 'f211',
            'leanpub': 'f212',
            'sellsy': 'f213',
            'shirtsinbulk': 'f214',
            'simplybuilt': 'f215',
            'skyatlas': 'f216',
            'cart-plus': 'f217',
            'cart-arrow-down': 'f218',
            'diamond': 'f219',
            'ship': 'f21a',
            'user-secret': 'f21b',
            'motorcycle': 'f21c',
            'street-view': 'f21d',
            'heartbeat': 'f21e',
            'venus': 'f221',
            'mars': 'f222',
            'mercury': 'f223',
            'intersex,transgender': 'f224',
            'transgender-alt': 'f225',
            'venus-double': 'f226',
            'mars-double': 'f227',
            'venus-mars': 'f228',
            'mars-stroke': 'f229',
            'mars-stroke-v': 'f22a',
            'mars-stroke-h': 'f22b',
            'neuter': 'f22c',
            'genderless': 'f22d',
            'facebook-official': 'f230',
            'pinterest-p': 'f231',
            'whatsapp': 'f232',
            'server': 'f233',
            'user-plus': 'f234',
            'user-times': 'f235',
            'hotel,bed': 'f236',
            'viacoin': 'f237',
            'train': 'f238',
            'subway': 'f239',
            'medium': 'f23a',
            'yc,y-combinator': 'f23b',
            'optin-monster': 'f23c',
            'opencart': 'f23d',
            'expeditedssl': 'f23e',
            'battery-4,battery-full': 'f240',
            'battery-3,battery-three-quarters': 'f241',
            'battery-2,battery-half': 'f242',
            'battery-1,battery-quarter': 'f243',
            'battery-0,battery-empty': 'f244',
            'mouse-pointer': 'f245',
            'i-cursor': 'f246',
            'object-group': 'f247',
            'object-ungroup': 'f248',
            'sticky-note': 'f249',
            'sticky-note-o': 'f24a',
            'cc-jcb': 'f24b',
            'cc-diners-club': 'f24c',
            'clone': 'f24d',
            'balance-scale': 'f24e',
            'hourglass-o': 'f250',
            'hourglass-1,hourglass-start': 'f251',
            'hourglass-2,hourglass-half': 'f252',
            'hourglass-3,hourglass-end': 'f253',
            'hourglass': 'f254',
            'hand-grab-o,hand-rock-o': 'f255',
            'hand-stop-o,hand-paper-o': 'f256',
            'hand-scissors-o': 'f257',
            'hand-lizard-o': 'f258',
            'hand-spock-o': 'f259',
            'hand-pointer-o': 'f25a',
            'hand-peace-o': 'f25b',
            'trademark': 'f25c',
            'registered': 'f25d',
            'creative-commons': 'f25e',
            'gg': 'f260',
            'gg-circle': 'f261',
            'tripadvisor': 'f262',
            'odnoklassniki': 'f263',
            'odnoklassniki-square': 'f264',
            'get-pocket': 'f265',
            'wikipedia-w': 'f266',
            'safari': 'f267',
            'chrome': 'f268',
            'firefox': 'f269',
            'opera': 'f26a',
            'internet-explorer': 'f26b',
            'tv,television': 'f26c',
            'contao': 'f26d',
            '500px': 'f26e',
            'amazon': 'f270',
            'calendar-plus-o': 'f271',
            'calendar-minus-o': 'f272',
            'calendar-times-o': 'f273',
            'calendar-check-o': 'f274',
            'industry': 'f275',
            'map-pin': 'f276',
            'map-signs': 'f277',
            'map-o': 'f278',
            'map': 'f279',
            'commenting': 'f27a',
            'commenting-o': 'f27b',
            'houzz': 'f27c',
            'vimeo': 'f27d',
            'black-tie': 'f27e',
            'fonticons': 'f280',
            'reddit-alien': 'f281',
            'edge': 'f282',
            'credit-card-alt': 'f283',
            'codiepie': 'f284',
            'modx': 'f285',
            'fort-awesome': 'f286',
            'usb': 'f287',
            'product-hunt': 'f288',
            'mixcloud': 'f289',
            'scribd': 'f28a',
            'pause-circle': 'f28b',
            'pause-circle-o': 'f28c',
            'stop-circle': 'f28d',
            'stop-circle-o': 'f28e',
            'shopping-bag': 'f290',
            'shopping-basket': 'f291',
            'hashtag': 'f292',
            'bluetooth': 'f293',
            'bluetooth-b': 'f294',
            'percent': 'f295',
            'gitlab': 'f296',
            'wpbeginner': 'f297',
            'wpforms': 'f298',
            'envira': 'f299',
            'universal-access': 'f29a',
            'wheelchair-alt': 'f29b',
            'question-circle-o': 'f29c',
            'blind': 'f29d',
            'audio-description': 'f29e',
            'volume-control-phone': 'f2a0',
            'braille': 'f2a1',
            'assistive-listening-systems': 'f2a2',
            'asl-interpreting,american-sign-language-interpreting': 'f2a3',
            'deafness,hard-of-hearing,deaf': 'f2a4',
            'glide': 'f2a5',
            'glide-g': 'f2a6',
            'signing,sign-language': 'f2a7',
            'low-vision': 'f2a8',
            'viadeo': 'f2a9',
            'viadeo-square': 'f2aa',
            'snapchat': 'f2ab',
            'snapchat-ghost': 'f2ac',
            'snapchat-square': 'f2ad',
            'pied-piper': 'f2ae',
            'first-order': 'f2b0',
            'yoast': 'f2b1',
            'themeisle': 'f2b2',
            'google-plus-circle,google-plus-official': 'f2b3',
            'fa,font-awesome': 'f2b4'
        };
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
                options.scaleExtent = [
                    0.2,
                    5
                ];
            } else {
                options.scaleExtent = [
                    1,
                    1
                ];
            }
            let zoom = d3.zoom().scaleExtent(options.scaleExtent).on('zoom', function(event) {
                if (options.zoomActivated) {
                    $el.svgGroup.selectAll('.links, .nodes, .labels').attr('transform', event.transform);
                }
            });
            options.zoom = zoom;
            $el.svg.call(zoom);
        }
    }
    function buildLinks() {
        $el.link = $el.linksGroup.selectAll('line').data(data.links);
        $el.link.exit().remove();
        $el.line = $el.link.enter().append('line');
        $el.link = $el.link.merge($el.line);
        const className = (d)=>{
            const set = new Set();
            set.add(d.source.data.className);
            set.add(d.target.data.className);
            return set.size ? Array.from(set).join(' ') : '';
        };
        $el.link.attr('class', (d)=>{
            return 'link ' + className(d);
        }).on('click', function(e, d) {
            updateInfo(d.data, false);
        })// .attr("d", d3.linkHorizontal()
        //     .x(d => d.x)
        //     .y(d => d.y))
        .attr('marker-end', 'url(#arrowhead)');
        // Makes path go along with the link by providing position for link labels
        $el.edgePaths = $el.labelsGroup.selectAll(`.${classNames.links.paths}`).data(data.links);
        $el.edgePaths.exit().remove();
        $el.edgePathsEnter = $el.edgePaths.enter().append('path');
        $el.edgePaths = $el.edgePaths.merge($el.edgePathsEnter);
        $el.edgePaths.attr('class', classNames.links.paths).attr('fill-opacity', 0).attr('stroke-opacity', 0).attr('id', (d, i)=>classNames.links.paths + i + canvasId).style('pointer-events', 'none');
        // Labels
        $el.edgeLabel = $el.labelsGroup.selectAll(`.${classNames.links.labels}`).data(data.links);
        $el.edgeLabel.exit().remove();
        $el.labelEnter = $el.edgeLabel.enter().append('text').style('pointer-events', 'none').attr('class', classNames.links.labels).attr('id', (d, i)=>classNames.links.labels + i + canvasId).attr('font-size', options.edgeLabels.fontSize).attr('fill', '#aaa');
        $el.labelEnter.append('textPath').style('text-anchor', 'middle').style('pointer-events', 'none').attr('startOffset', '50%').attr('class', (d)=>'textPath ' + className(d));
        $el.edgeLabel = $el.edgeLabel.merge($el.labelEnter);
        // Update labels
        $el.edgeLabel.select('.textPath').attr('class', (d)=>'textPath ' + className(d)).attr('xlink:href', (d, i)=>`#${classNames.links.paths}` + i + canvasId).text((d)=>{
            if (options.callbacks.onEdgeLabel) {
                return runCallback('onEdgeLabel', d);
            } else {
                if (options.edgeLabels.print) {
                    return d.source.data.type === 'Entity' && toggled.original ? options.edgeLabels.wasGeneratedBy : options.edgeLabels.used;
                } else {
                    return '';
                }
            }
        });
    }
    function getTextToAppendToNode(d) {
        let text = icon(d) || getNodeText(d) || '';
        text = icon(d) ? '&#x' + text : text;
        const className = icon(d) ? ' icon' : getNodeText(d) ? ' has-label' : '';
        return {
            text,
            className
        };
    }
    function getNodeProp(d, prop) {
        try {
            return d[prop] || d.data[prop] || d.data.data[prop];
        } catch (e) {}
    }
    function getNodeProperties(d) {
        return getNodeProp(d, 'properties');
    }
    function getNodeText(d) {
        return getNodeProp(d, options.nodeLabelProperty);
    }
    function getNodeType(d) {
        return getNodeProp(d, 'type');
    }
    function getNodeCat(d) {
        return getNodeProp(d, 'subType');
    }
    function getNodeId(d) {
        return getNodeProp(d, 'id');
    }
    function icon(d) {
        let code;
        const subType = getNodeCat(d);
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
        return node.append('text').attr('class', function(d) {
            return `${classNames.nodes.text} ` + getTextToAppendToNode(d).className;
        }).attr('fill', '#ffffff').attr('font-size', function(d) {
            return icon(d) ? options.node.radius + 'px' : '8px';
        }).attr('pointer-events', 'none').attr('text-anchor', 'middle').attr('y', function(d) {
            return icon(d) ? parseInt(Math.round(options.node.radius * 0.32)) + 'px' : '4px';
        }).html(function(d) {
            return getTextToAppendToNode(d).text;
        });
    }
    function initImageMap() {
        let key, keys;
        for(key in options.imageMap){
            if (options.imageMap.hasOwnProperty(key)) {
                keys = key.split('|');
                if (!options.imagesMap[keys[0]]) {
                    options.imagesMap[keys[0]] = [
                        key
                    ];
                } else {
                    options.imagesMap[keys[0]].push(key);
                }
            }
        }
    }
    function fetchImage(d, ops) {
        fetch(image(d)).then((r)=>r.text()).then((svgXml)=>{
            const id = getNodeId(d);
            const toBase64 = (xml)=>{
                return "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
            };
            const fillColor = getFillColor(d, ops);
            svgXml = svgXml.replace('$bgColor', fillColor);
            svgXml = svgXml.replace('$borderColor', d3.rgb(fillColor).darker(1));
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#image--${id}--${ops.className}`).attr('href', toBase64(svgXml));
        }).catch(console.error.bind(console));
    }
    function getImageActions(d, ops) {
        const subType = getNodeCat(d);
        if (options.imageMap && options.imagesMap[subType]) {
            return propertyValueSearch(d, options.imagesMap[subType], options.imageMapActions);
        }
        return null;
    }
    function getImageTypeClass(d, ops) {
        const actions = getImageActions(d, ops);
        return actions ? actions.type : '';
    }
    function getDefaultSize() {
        return options.node.radius * 2;
    }
    function getImageHeight(d) {
        const actions = getImageActions(d);
        const sz = getDefaultSize();
        return actions ? actions.height || sz : sz;
    }
    function getImageWidth(d) {
        const actions = getImageActions(d);
        const sz = getDefaultSize();
        return actions ? actions.width || sz : sz;
    }
    function getImageType(d, ops) {
        let type = 'image';
        let actions = getImageActions(d, ops);
        const uri = 'http://www.w3.org/2000/svg';
        let node = document.createElementNS(uri, type);
        if (actions) {
            type = actions ? actions.type : 'image';
            node = document.createElementNS(uri, type);
            if (actions.fn === 'append') {
                if (type === 'image') {
                    fetchImage(d, ops);
                } else {
                    node.classList.add(type);
                    for (let io of actions.data){
                        const path = document.createElementNS(uri, io.tag || 'path');
                        if (io.draw && Array.isArray(io.draw)) {
                            for (let attr of io.draw){
                                path.setAttribute(attr[0], attr[1]);
                            }
                        } else {
                            path.setAttribute(io.property || 'd', io.draw);
                        }
                        node.append(path);
                    }
                }
            }
        }
        return {
            node,
            type,
            actions
        };
    }
    function image(d) {
        let img;
        const subType = getNodeCat(d);
        if (options.imageMap) {
            img = propertyValueSearch(d, options.imagesMap[subType], options.imageMap);
        }
        return img;
    }
    function propertyValueSearch(d, imagesForLabel, dict) {
        let i, result, imgLevel, label, labelPropertyValue, property, value;
        if (imagesForLabel) {
            imgLevel = 0;
            const subType = getNodeCat(d);
            for(i = 0; i < imagesForLabel.length; i++){
                labelPropertyValue = imagesForLabel[i].split('|');
                switch(labelPropertyValue.length){
                    case 3:
                        value = labelPropertyValue[2];
                    /* falls through */ case 2:
                        property = labelPropertyValue[1];
                    /* falls through */ case 1:
                        label = labelPropertyValue[0];
                        break;
                    default:
                        break;
                }
                const properties = getNodeProperties(d);
                if (subType === label && (!property || properties[property] !== undefined) && (!value || properties[property] === value)) {
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
        const subType = getNodeCat(d);
        let fillColor = typeToColor(subType);
        const actions = getImageActions(d, ops);
        const id = getNodeId(d);
        if (actions) {
            const colors = options.theme.colors;
            const glowColor = isHighlighted(d) ? colors.glow.highlighted : colors.glow.regular;
            fillColor = ops.className === 'glow' ? glowColor : actions.color || fillColor;
            const $node = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`${selector} #node--${id}`);
            if (!actions.showMain) {
                $node.find('circle.main').addClass('invisible');
            }
            if (!actions.showMainGlow) {
                $node.find('circle.glow').addClass('invisible');
            }
        }
        return fillColor;
    }
    function appendImageToNode(node, ops) {
        return node.append((d)=>getImageType(d, ops).node).attr('class', (d)=>`image ${ops.className} ${getImageTypeClass(d, ops)}`).attr('id', (d)=>`image--${getNodeId(d)}--${ops.className}`).attr('xlink:href', (d)=>image(d)).attr('fill', (d)=>getFillColor(d, ops)).attr('stroke', (d)=>typeToDarkenColor(getNodeCat(d))).attr('height', (d)=>icon(d) ? '24px' : getImageHeight(d) + 'px').attr('width', (d)=>icon(d) ? '24px' : getImageWidth(d) + 'px');
    }
    function getHighlightClass(d, isNode = true) {
        let className = isNode ? 'node--' : 'rel--';
        for (let h of options.highlight){
            if (h.id === getNodeId(d)) {
                className = className + 'highlighted';
                className += h.isSecondary ? 'is-secondary' : '';
                return className;
            }
        }
        return '';
    }
    function isHighlighted(d) {
        return getHighlightClass(d).indexOf('highlighted') !== -1;
    }
    function buildNodes() {
        options.graphDepth = 0;
        const getDepth = (d)=>{
            return d.depth;
        };
        const childInfo = (d, i)=>{
            const posY = (ci, mod)=>{
                const k = mod ? 12 : 20;
                const gDepth = ci * k * d.depth;
                if (gDepth > options.graphDepth) {
                    options.graphDepth = gDepth;
                }
                return gDepth;
            };
            treeWidth = Math.max(treeWidth, d.children ? d.children.length : 0);
            if (d.parent) {
                const children = d.parent.children;
                const id = d.data.id;
                const pId = d.parent.data.id;
                const pInfo = parentInfo[pId];
                const mod = pInfo ? pInfo.y : 0 // Use the parent's y position or 0
                ;
                const pDepth = pInfo ? Math.min(pInfo.dx, pInfo.d) + 1 : getDepth(d);
                let x = 0;
                treeWidth = Math.max(treeWidth, children ? children.length : 0);
                for (let n of children){
                    if (n.data.id === id) {
                        return {
                            id,
                            y: posY(x, mod) + mod,
                            d: pDepth
                        };
                    }
                    x++;
                }
                // No children or (child not found / data corrupted)
                return {
                    id,
                    y: posY(0),
                    d: pDepth
                };
            } else {
                // Root element
                return {
                    id: null,
                    y: posY(0),
                    d: getDepth(d)
                };
            }
        };
        const parentInfo = {};
        data.nodes.forEach(function(d, i) {
            const pos = positionData[d.id];
            if (options.keepPositionsOnDataToggle && pos && !toggled.original) {
                d.y = pos.y;
                d.x = pos.x;
            } else {
                let ci = childInfo(d, i);
                d.y = ci.y;
                const depth = ci.d;
                d.x = 100 * depth + 300;
                parentInfo[ci.id] = {
                    y: ci.y,
                    d: getDepth(d),
                    dx: depth
                };
            }
        });
        // data.nodes.forEach(function(d, i) {
        //     d.x = sz.width/2 + i;
        //     d.y = 100*d.depth + 100;
        // })
        $el.node = $el.nodeGroup.selectAll('.node').data(data.nodes);
        $el.node.exit().remove();
        $el.nodeEnter = $el.node.enter().append('g').attr('id', (d)=>`node--${getNodeId(d)}`).attr('data-node', (d)=>{
            runCallback('onNodeBuild', {
                node: d
            });
        }).on('click', function(e, d) {
            d.wasClicked = true;
            options.visitedNodes.add(getNodeId(d));
            updateInfo(d.data, true);
            runCallback('onNodeClick', {
                event: e,
                node: d
            });
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`${selector} .${classNames.infoCloseBtn}`).fadeIn();
        }).call(drag());
        $el.nodeGlow = $el.nodeEnter.append('circle').attr('class', classNames.nodes.glow).attr('r', options.node.radius * 1.3);
        $el.nodeMain = $el.nodeEnter.append('circle').attr('class', classNames.nodes.main).attr('fill', (d)=>typeToColor(getNodeCat(d))).attr('stroke', (d)=>typeToDarkenColor(getNodeCat(d))).attr('r', options.node.radius);
        if (options.node.append) {
            if (options.node.append === 'text') {
                appendTextToNode($el.nodeEnter);
            }
            appendImageToNode($el.nodeEnter, {
                className: 'glow'
            });
            appendImageToNode($el.nodeEnter, {
                className: 'main'
            });
        }
        $el.node = $el.node.merge($el.nodeEnter);
        const getHoverClass = (d)=>{
            const cat = getNodeCat(d);
            return legendFilters[cat] ? 'has-hover ' : '';
        };
        $el.node.attr('class', (d)=>{
            const classNames = `node node--${getNodeCat(d)} ${getHoverClass(d)}${getHighlightClass(d)} ${d.data.className || ''} ${d.wasClicked || options.visitedNodes.has(getNodeId(d)) ? 'is-visited' : ''}`;
            let customClassNames = runCallback('onNodeCssClass', {
                node: d
            });
            return classNames.trim() + ' ' + customClassNames || '';
        }).attr('id', (d)=>`node--${getNodeId(d)}`);
        $el.node.select(`circle.${classNames.nodes.glow}`).attr('class', classNames.nodes.glow).style('fill', (d)=>{
            return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : typeToColor(getNodeCat(d));
        }).style('stroke', (d)=>{
            return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : typeToDarkenColor(getNodeCat(d));
        }).append('title').text((d)=>getNodeCat(d));
        $el.node.select(`circle.${classNames.nodes.main}`).attr('class', classNames.nodes.main).attr('fill', (d)=>typeToColor(getNodeCat(d))).attr('stroke', (d)=>typeToDarkenColor(getNodeCat(d))).append('title').text((d)=>getNodeCat(d));
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`${selector} .${classNames.nodes.image}`).remove();
        appendImageToNode($el.node, {
            className: 'glow'
        });
        appendImageToNode($el.node, {
            className: 'main'
        });
    }
    function appendInfoPanel() {
        $el.info = options.infoPanelBeforeSvg ? $el.canvas.append('div').lower() : $el.canvas.append('div');
        $el.info.attr('class', classNames.info);
        $infoParent = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).find(`.${classNames.info}`);
        const onInfoCloseBuild = ()=>{
            const c = runCallback('onInfoCloseBuild');
            return c ? c : '<i class="fa fa-times" aria-hidden="true"></i>';
        };
        $el.info.append('span').attr('class', classNames.info + '--close ' + classNames.infoCloseBtn).attr('style', 'display: none;').attr('title', 'Close Info Panel').html(onInfoCloseBuild());
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).on('click', `.${classNames.infoCloseBtn}`, (e)=>{
            e.stopPropagation();
            clearInfo();
            runCallback('onInfoCloseClick', {
                event: e
            });
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(e.currentTarget).hide();
        });
        $el.info = $el.info.append('div').attr('class', classNames.infoMain);
        $info = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).find(`.${classNames.infoMain}`);
    }
    function isValidURL(string) {
        const res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res !== null;
    }
    function clearInfo() {
        $infoParent.removeClass(classNames.active);
        $info.removeClass(classNames.infoNode);
        $info.removeClass(classNames.infoRelation);
        $info.html('');
    }
    function updateInfo(d, isNode) {
        clearInfo();
        $infoParent.addClass(classNames.active);
        isNode ? $info.addClass(classNames.infoNode) : $info.removeClass(classNames.infoNode);
        !isNode ? $info.addClass(classNames.infoRelation) : $info.removeClass(classNames.infoRelation);
        $info.attr('data-id', getNodeId(d));
        const type = getNodeType(d);
        if (type) {
            appendInfoElement(d, 'class', isNode, type !== getNodeCat(d) ? getNodeCat(d) : type);
        }
        if (!options.hideElementId) {
            appendInfoElement(d, 'property', isNode, '&lt;id&gt;', getNodeId(d));
        }
        const properties = getNodeProperties(d);
        if (properties) {
            Object.keys(properties).forEach(function(property) {
                let mapped = options.propertyMap[property] || property;
                appendInfoElement(d, 'property', isNode, mapped, JSON.stringify(properties[property]));
            });
        }
        runCallback('onAfterInfoUpdateBuild');
    }
    function appendInfoElement(d, cls, isNode, property, value) {
        const isNavigation = options.idNavigate?.props[property];
        value = value ? value.toString().replaceAll('"', '') : value;
        let formattedUrl = false;
        let href = '#';
        if (isNavigation && (options.idNavigate?.url || isNavigation.url) && !isNavigation.callback) {
            const label = getNodeCat(d) || 'Unknown';
            const excludeList = options.idNavigate.exclude[label];
            if (!excludeList || excludeList && excludeList.indexOf(property) === -1) {
                formattedUrl = true;
                const url = isValidURL(value) ? value : options.idNavigate.url;
                href = url.replace('{subType}', label.toLowerCase());
                href = href.replace('{id}', getNodeId(d));
                href = isValidURL(value) && href.indexOf('://') === -1 ? '//' + href : href;
            }
        } else {
            if (isNavigation && isNavigation.callback) {
                const result = isNavigation.callback(d, property, value);
                href = result.href;
                value = result.value || value;
                if (result.href) {
                    formattedUrl = true;
                }
            }
        }
        let elem = $el.info.append('span');
        let valueHtml = '';
        if (value) {
            valueHtml = !formattedUrl ? `: <span>${value}</span>` : `: <a href="${href}" target="_blank">${value} </a>`;
        }
        cls += ` ${property.replace(options.propertyPrefixClear, '')} cell`;
        elem.attr('class', cls + (!formattedUrl ? ' flat' : ' link')).html('<strong>' + property.replace(options.propertyPrefixClear, '') + '</strong>' + valueHtml);
        if (!value) {
            elem.style('background-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? options.theme.colors.nodeOutlineFill : isNode ? typeToColor(property) : defaultColor();
            }).style('border-color', function(d) {
                return options.theme.colors.nodeOutlineFill ? typeToDarkenColor(options.theme.colors.nodeOutlineFill) : isNode ? typeToDarkenColor(property) : defaultDarkenColor();
            }).style('color', function(d) {
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
        const getPos = (call = 'onCenterX', prop = 'clientWidth')=>{
            let p = runCallback(call);
            if (!p) {
                return $el.svgGroup.node().parentElement[prop] / 2;
            }
            return p;
        };
        simulation = d3.forceSimulation(data.nodes).alpha(0.5)//.force("link", d3.forceLink(data.links).id(d => d.depth).distance(20).strength(1))
        .force('charge', d3.forceManyBody().strength(1)).force('center', d3.forceCenter(getPos(), getPos('onCenterY', 'clientHeight')));
    //.force("x", d3.forceX())
    //.force('y', d3.forceY(20).strength(.2))
    }
    function updateSimulation() {
        simulation.nodes(data.nodes);
        simulation.alpha(.5).alphaTarget(0).restart();
    }
    function stratify(data, parentKey) {
        parentKey = parentKey || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$DataConverter$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT;
        let has = {};
        let x = 0;
        const root = d3.stratify().id(function(d) {
            x++;
            if (has[d.id]) {
                return d.id + '~' + x;
            } else {
                has[d.id] = true;
                return d.id;
            }
        }).parentId(function(d) {
            return d[parentKey];
        })(data);
        // Do a DFS and fix the duplicate graph ids back to their original form
        let stack = [
            root
        ];
        let visited = {};
        visited[root.id] = true;
        while(stack.length){
            let n = stack.pop();
            n.id = n.id.split('~')[0];
            if (n.children && n.children.length) {
                for (let c of n.children){
                    if (!visited[c.id]) {
                        visited[c.id] = true;
                        stack.push(c);
                    }
                }
            }
        }
        const descendants = root.descendants();
        const _links = root.links();
        let seen = {};
        let nodes = [];
        let fixed = {};
        for (let d of descendants){
            // Push what has not been seen
            if (!seen[d.id]) {
                seen[d.id] = d;
                nodes.push(d);
            } else {
                // Otherwise, find them in the relationships and reference the same object
                if (!fixed[d.id]) {
                    for (let l of _links){
                        if (l.source.id === d.id) {
                            l.source = seen[d.id];
                        }
                        if (l.target.id === d.id) {
                            l.target = seen[d.id];
                        }
                    }
                    // We only want to fix once per node id for efficiency,
                    fixed[d.id] = true;
                }
            }
        }
        return {
            root,
            nodes,
            links: _links
        };
    }
    function loadData(data) {
        if (data.stratify) {
            dataKey = models.stratify;
            return stratify(data.stratify);
        } else {
            dataKey = data.root ? models.root : null;
            const root = data.root || data;
            return {
                root
            };
        }
    }
    function resolveDataMethod(data, dataKey, parentKey) {
        if (dataKey === models.stratify) {
            buildTree(stratify(data, parentKey));
        } else {
            buildTree({
                root: data
            });
        }
    }
    function toggleEdgeLabels() {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).toggleClass(classNames.links.hidden);
    }
    function toggleData(ops) {
        toggled.has = true;
        const { filter, parentKey } = ops;
        if (simulation) {
            simulation.stop();
        }
        let _data = dataKey ? allData[dataKey] : allData;
        if (filter) {
            toggled.original = false;
            if (filteredData[filter] === undefined) {
                filteredData[filter] = _data.filter((item)=>item.type !== filter);
            }
            resolveDataMethod(filteredData[filter], dataKey, parentKey);
        } else {
            toggled.original = true;
            resolveDataMethod(_data, dataKey, parentKey);
        }
    }
    function runCallback(callback, args) {
        if (options.callbacks[callback] && typeof options.callbacks[callback] === 'function') {
            return options.callbacks[callback]({
                $el,
                data,
                options,
                args
            });
        } else {
            return false;
        }
    }
    function setUpSvg() {
        const isLgScreen = ()=>parseInt($el.canvas.style('width')) > 1024;
        const getMargins = ()=>isLgScreen() ? 100 : 50;
        const margin = {
            top: 20,
            right: getMargins(),
            bottom: 90,
            left: getMargins()
        };
        const sizes = runCallback('onSvgSizing', {
            isLgScreen,
            getMargins,
            sz,
            margin
        });
        sz.width = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).width() - margin.left;
        sz.height = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(selector).height() - margin.top;
        if (sizes) {
            sz.width = sizes.width || sz.width;
            sz.height = sizes.height || sz.height;
        }
        $el.svg = $el.canvas.append('svg').attr('width', sz.width).attr('height', sz.height);
        runCallback('onBeforeBuild');
        $el.svgGroup = $el.svg.append('g');
        //.attr('transform', 'translate(' + (margin.left * 2) + ',' + (margin.top * 2) + ')')
        $el.svg.append('defs').append('marker').attr('id', 'arrowhead').attr('viewBox', '-0 -5 10 10') // The bound of the SVG viewport for the current SVG fragment. Defines a coordinate system 10 wide and 10 high starting on (0, -5)
        .attr('refX', 30) // X coordinate for the reference point of the marker. If circle is bigger, this needs to be bigger.
        .attr('refY', 0).attr('orient', 'auto').attr('markerWidth', 8).attr('markerHeight', 8).attr('xoverflow', 'visible').append('svg:path').attr('d', 'M 0,-5 L 10 ,0 L 0,5').attr('fill', '#999').style('stroke', 'none');
        $el.linksGroup = $el.svgGroup.append('g').attr('class', 'links').attr('stroke', '#999').attr('stroke-opacity', 0.6);
        $el.labelsGroup = $el.svgGroup.append('g').attr('class', 'labels');
        $el.nodeGroup = $el.svgGroup.append("g").attr('class', 'nodes').attr("stroke-width", 1.5);
        appendInfoPanel();
    }
    function updatePositions() {
        $el.link.attr("x1", (d)=>d.source.x).attr("y1", (d)=>d.source.y).attr("x2", (d)=>d.target.x).attr("y2", (d)=>d.target.y);
        $el.node.select(`circle.${classNames.nodes.main}`).attr("cx", (d)=>{
            positionData[d.id] = positionData[d.id] || {};
            positionData[d.id].x = d.x;
            return d.x;
        }).attr("cy", (d)=>{
            positionData[d.id] = positionData[d.id] || {};
            positionData[d.id].y = d.y;
            return d.y;
        });
        $el.node.select(`circle.${classNames.nodes.glow}`).attr("cx", (d)=>d.x).attr("cy", (d)=>d.y);
        $el.node.select(`.${classNames.nodes.text}`).attr("x", (d)=>d.x).attr("y", (d)=>d.y);
        const getX = (d)=>d.x - getImageWidth(d) / 2;
        const getY = (d)=>d.y - getImageHeight(d) / 2;
        $el.node.select(`.${classNames.nodes.image}.main.g`).attr("transform", (d)=>`translate(${getX(d)}, ${getY(d)})`);
        $el.node.select(`.${classNames.nodes.image}.glow.g`).attr("transform", (d)=>`translate(${getX(d)}, ${getY(d)})`);
        $el.node.select(`.${classNames.nodes.image}.main`).attr("x", (d)=>getX(d)).attr("y", (d)=>getY(d));
        $el.node.select(`.${classNames.nodes.image}.glow`).attr("x", (d)=>getX(d)).attr("y", (d)=>getY(d));
        $el.edgePaths.attr('d', (d)=>{
            if (options.reverseEdgeLabels) {
                return 'M ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset) + ' L ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset);
            } else {
                return 'M ' + d.source.x + ' ' + (d.source.y + options.edgeLabels.offset) + ' L ' + d.target.x + ' ' + (d.target.y + options.edgeLabels.offset);
            }
        });
    }
    function ticked() {
        simulation.on("tick", (e)=>{
            // const ky = simulation.alpha()
            // data.links.forEach(function(d, i) {
            //     d.source.y += (d.source.depth * 70 - d.source.y) * 2 * ky;
            // })
            updatePositions();
        });
    }
    function reverseRelationships(links) {
        for (let l of links){
            let temp = l.target;
            l.target = l.source;
            l.source = temp;
        }
        return links;
    }
    function buildTree(_data) {
        const { root, nodes, links } = _data;
        const h = d3.hierarchy(root);
        const _links = links || h.links();
        data.links = options.reverseRelationships ? reverseRelationships(_links) : _links;
        data.nodes = nodes || h.descendants();
        buildLinks();
        buildNodes();
        if (isInit) {
            isInit = false;
            initSimulation();
        } else {
            updateSimulation();
        }
        ticked();
        createZoom();
        runCallback('onAfterBuild', _data);
        return $el.svg.node();
    }
    init();
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
    };
}
const __TURBOPACK__default__export__ = ProvenanceTree;
}),
"[project]/src/lib/hooks/useD3.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
const useD3 = ()=>{
    const [d3, setD3] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const loadD3 = async ()=>{
            try {
                const lib = await __turbopack_context__.A("[externals]/d3 [external] (d3, esm_import, [project]/node_modules/d3, async loader)");
                setD3(lib);
                setLoading(false);
            } catch (e) {
                setLoading(false);
                setError(e);
                console.error(e);
            }
        };
        loadD3();
        return ()=>{};
    }, []);
    return {
        d3,
        loading,
        error
    };
};
const __TURBOPACK__default__export__ = useD3;
}),
"[project]/src/lib/js/constants.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CLASS_NAMES",
    ()=>CLASS_NAMES,
    "SELECTORS",
    ()=>SELECTORS,
    "SELECTOR_ID",
    ()=>SELECTOR_ID,
    "isEdge",
    ()=>isEdge
]);
const SELECTOR_ID = 'provenanceTree';
const isEdge = ($el)=>{
    return $el.data('node') === 'Edge';
};
const CLASS_NAMES = {
    disabled: 'is-disabled',
    hover: 'has-hover',
    toggled: 'has-toggled'
};
const SELECTORS = {
    legend: {
        legendItem: '.js-legend__item',
        legendTrigger: '.js-legend--trigger'
    }
};
}),
"[project]/src/lib/components/ProvenanceUI.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__ = __turbopack_context__.i("[externals]/prop-types [external] (prop-types, cjs, [project]/node_modules/prop-types)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$ProvenanceTree$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/ProvenanceTree.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useD3$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useD3.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
function ProvenanceUI({ children, data, options = {} }) {
    const { d3, error, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useD3$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"])();
    const selectorId = options.selectorId || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTOR_ID"];
    const initialized = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    const addVisitedClass = ()=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId}`).on('click', '.node', function(e) {
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(e.currentTarget).addClass('is-visited');
        });
    };
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        addVisitedClass();
    });
    if ((options.dontCheckInitialized || !initialized.current) && !loading && !error) {
        initialized.current = true;
        window.ProvenanceTreeD3 = window.ProvenanceTreeD3 || {};
        window.ProvenanceTreeD3[selectorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$ProvenanceTree$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(d3, `#${selectorId}`, {
            ...options,
            data
        });
        if (options.callbacks?.onInitializationComplete) {
            options.callbacks.onInitializationComplete(selectorId);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "c-provenance c-provenance--Tree js-provenance",
        id: selectorId,
        style: {
            minHeight: options.minHeight || 300
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/lib/components/ProvenanceUI.jsx",
        lineNumber: 33,
        columnNumber: 9
    }, this);
}
ProvenanceUI.propTypes = {
    options: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    data: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    dataUrl: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string,
    children: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].node
};
const __TURBOPACK__default__export__ = ProvenanceUI;
}),
"[project]/src/lib/components/Toggle.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__ = __turbopack_context__.i("[externals]/prop-types [external] (prop-types, cjs, [project]/node_modules/prop-types)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [ssr] (ecmascript)");
;
;
;
;
;
function Toggle({ context, icon = true, selectorId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTOR_ID"], ariaLabel = 'Toggle', text = '', className = '', disabled = false }) {
    const toggleData = (e)=>{
        const $el = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(e.currentTarget);
        const toggled = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled;
        $el.toggleClass(toggled);
        const $p = $el.parents(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTORS"].legend.legendItem);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isEdge"])($p)) {
            $p.toggleClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled);
        }
        const $trigger = $p.find(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTORS"].legend.legendTrigger);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isEdge"])($p) && $p.hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover)) {
            $trigger.eq(0).trigger('click', {
                force: true
            });
        }
        if (context !== null) {
            context(e, $el.hasClass(toggled), selectorId);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
        className: `c-toggle ${className} ${disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled : ''}`,
        children: [
            !icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "c-toggle__text",
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/lib/components/Toggle.jsx",
                        lineNumber: 30,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "c-toggle__main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                onClick: toggleData
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Toggle.jsx",
                                lineNumber: 32,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "c-toggle__slider c-toggle__slider--round",
                                "aria-label": ariaLabel
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Toggle.jsx",
                                lineNumber: 33,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/lib/components/Toggle.jsx",
                        lineNumber: 31,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true),
            icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                    className: `c-toggle__icon fa fa-eye ${disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].toggled : ''}`,
                    "aria-label": ariaLabel,
                    onClick: toggleData,
                    title: ariaLabel
                }, void 0, false, {
                    fileName: "[project]/src/lib/components/Toggle.jsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, this)
            }, void 0, false)
        ]
    }, void 0, true, {
        fileName: "[project]/src/lib/components/Toggle.jsx",
        lineNumber: 26,
        columnNumber: 9
    }, this);
}
Toggle.propTypes = {
    context: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].func,
    icon: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].bool,
    disabled: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].bool,
    selectorId: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string,
    ariaLabel: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string,
    text: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string,
    className: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string
};
const __TURBOPACK__default__export__ = Toggle;
}),
"[project]/src/lib/hooks/useHelpHtml.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
;
;
const useHelpHtml = (help = {})=>{
    let images = {
        visitedNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3RDkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3RTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzdCOTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzdDOTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIkAAAEFAQEAAAAAAAAAAAAAAAACBAUGBwEIAQEAAgMBAQAAAAAAAAAAAAAAAQQDBQYCBxAAAgEDAQUGBAQHAAAAAAAAAQIDAAQFESExURIGQWFxMhMHocFCcoGRIjOx0VKSIxQVEQACAgICAgEEAwAAAAAAAAAAAQIDEQQhBTFBEoEiMgZRcTP/2gAMAwEAAhEDEQA/APVNAFAFAJaSNfMwXxIFSk2Q5JAssbeVw3gQaOLQUkxVQSFAFAFAcZgoJJ0A2k0QbIy7yLEHlb04xvbcdPlViNaissrOcpvESl5D3K6YtZmijlkvZUOji1QyAH7/ACfGsM96C8Gzo6K+xZfAmx9zel7iVY5pJbFmOim6jMa6/ftQfiaiG9B+Sbuhugsrkulnkjyq3P6sLAFWB12HcQasOEZLKNX8pVvEiVVlZQynUHcarNYLCeTtCQoBjk5iAsQO/a3h2Vnpj7K98vRj3uB1HPkMlLhLaQpj7XQXpU6GWUjX09R9Kgjm4nZWt3Nht4Xg67ousUY/OS5ZWURUUKgCqNgA2CtedQlg6yqwKsAQd4O0UJwT/QvUU+IykOLmctir1/TgVjr6EzeULr9D7tONXtTYcXh+Dm+76yM4fOK5RsuMmOrRE7PMvzra3R9nF0S9EhVcshQETkif9hu5Rp+VWYfgVpc2L6Hn8O8lxdyyfuyXVw0mu/mMrVz1n5H0/TSVSwLrwWQoBvfu8dsZE/cjZHjI38ysCvxr1DyYdhJweTXbvrqyxr/4YZJ54xoVYGJQSNNvMOb4V0L/AM/ofLpcWv8Atl2TIWD+S5iY8A6n51XLA4oCOykWjrJ2MND4irFL4wVr1h5MQ6vxEmH6iuOZdLLIu1xaydnqNtkjPfzfqHjWm2qXCR3vS7sbakvZGVVN2FAPenMRLm89b2qLzWtrIlxfyfSFQ8yR+LsN3CrGtU5yNT227Gqp/wAmxTdN4zMKUvItQg0SVP0uDr2H5Gt5a8LB89qy5NssTxRP50VvuAP8arFkVQCJYlljKNuNTGWHk8yjlYK5nMBZ5C0exyMAmt5OPEbipG1SO6s8oRtXJjovs15ZiZ5fe2WRiuhHi8gskLKWEd2pLKAQAPUQjXf2rWvn179HTa/7KsfehVn7XZaVx/0cjHDD9SWiHnI7nkJ5f7aiHXy9nq/9ljj7UX7AdO2OMtVssbCIohtdt5ZjvZ2O0k1sYVxqRzGxs2bEsyLNBCsMYRfxPE1hlLLye4x+KwLryegoAoDjKrDRgCD2GiZDWSNisLeW9unAKqnJEND2hec79f66yq2RjdMRyuOtlO0FvE/y0o7pBUxHKoqDRQAOArG3kyJYO1BIUAUAUAUA3sopI4SZBpJI7uw2HTmYkDZwGgoBxQBQBQBQH//Z',
        currentNode: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDRUE1MUM3OTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDRUE1MUM3QTkxMjgxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkNFQTUxQzc3OTEyODExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkNFQTUxQzc4OTEyODExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDA4PEA8ODBMTFBQTExwbGxscHx8fHx8fHx8fHwEHBwcNDA0YEBAYGhURFRofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f/8AAEQgAQABAAwERAAIRAQMRAf/EAIoAAAIDAQEBAAAAAAAAAAAAAAAGAwQFAgEIAQACAwEBAAAAAAAAAAAAAAAABAMFBgIBEAACAQIEAwUGBAcAAAAAAAABAgMABBEhMQVBURJhgZEiE6FCciMUBnGxwTPR4TJSYkM0EQACAgIBBAEFAQEAAAAAAAAAAQIDEQQxIUFhEgVRgbEiMpHR/9oADAMBAAIRAxEAPwD6poAKACgCvNuNhCcJJ0VhquIJ8BUUroR5aF57dUOZI4Tdttc4Lcpj2nD88K8WxW+6OY71L4ki0GDAFSCDoRpUyYynng9oPQoAKAIrm5htoWmmbpRfEnkK4nNQWWRXXRri5S4FTcd7u7tiqsYoOEanUf5HjVNdtyn4Rl9r5Gy14X6x+n/TNpUrwoAs2e43do/VC5A4oc1P4iparpQ4YxRtWVPMX9uw2bZukN/FivllX9yPl2jsq6o2FYvJqdPcjfHp0kuUXanHAoAU/uG/NxeGFT8qA9IHNveP6VS7t3tLHZGW+U2fez1X8x/Is7xuwsUSOJPWvJ8RBDjgMtXY8FWoK6/Z+BPXodj8GFJazXR69wuJLhj/AKwxSIfCike2nIxS4RawrjHhHK7ZBEeq1eS1kGjxSMPEElT3ivX15OpJPlZNTad5uPqFsNwIMz4/T3IHSsuGqsPdf2GlbacdVwV2zq+q9o8DFZXclpcpOmqnMcxxFR1WOEk0L697qmpLsPMciSRrIhxVwGU9hzrQxkmso2sJqSTXDCRuiNm/tBPhQ3hZCUsJsQGYsxZsyxxJ7TWbbyYVvLyKrubjd7+4bP03FtF2LGAT4sxNPVrEUXOvH1rXnqS12ShQBV3NGNnJIh6ZYPnRNxDx+YH2UI9xnozek32wito5ncFpEVxEnmbzDHu76rmsPBQyWG0Pf2xfxXGyW0hYKSv9JIxAOYHgau9OWa0av4ueaF4NaRetGQ+8CPGmWsrA9JZTQgOrIxVhgykgjtFZtrDwYWSaeGKkkZt94vrdsvVcXMR5q4AbwYU9U8xRca8vateOhLXZMFAFXc2b6N4ox1TXHyYV5vJ5R/GjOOp7nHV9jdl2Cwlt44inS8aBBKmR8owz51XN5ZQyeXkeftrabWHZLWOSFJGC5uyLicMgc+eFXenHFaNX8ZD1oXk2qaLAVPuKwaC7Nwo+VOcceT8R361TbtPrL27My/yuq4We6/mX5Fnd9pW/jRkf0buEkwT4Y4E6qw4q3Glq7PViNF7rfgwpJry1PTf2kkZGs0StLEe0MoJH4EU5GcXwy1hbCXDOUvxNlaQTXLnQJGwHezhVHjXraXLOpTiuWjV2nZp1uBfbh0m4UEQQKcUiB1OPvOedLW3Z6Lgrtna9l6x4GGxs5Lu6SBOObNyUamuKanOSSIdah2zUUPEaLHGsaDBUAVR2DKtAlhYRtIxUUkuEdV6dEdxbw3ELQyr1I2o/UVzOCksMjtqjZFxlwxV3HYbu1YtGDNBwZRmPiFU12nKHHVGY2vjbK3lftEyzlShWkdr/AM0XwL+VAF+y2y8vGAiQhOMjZKO+pqteU+ENa+nZa/1XT69hr23bILGHpTzSN+5IdT/KrmihVrpyajU040xwue7LlTjYUAFABQBWu7O0kjd5YUdgpPUVBOnOo5VRlykQz165/wBRT+xDt222CWduwt4+v008xUE49I514qILsjmOpVHiK/wv4YZDSpRgKACgD//Z',
        theGraph: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0Qzk4NjExODkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0Qzk4NjExOTkxNUIxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRDOTg2MTE2OTE1QjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRDOTg2MTE3OTE1QjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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',
        infoPanel: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMCA3OS4xNzFjMjdmYWIsIDIwMjIvMDgvMTYtMjI6MzU6NDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRTVBMUE2NTkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRTVBMUE2NjkxNUYxMUVEQkYwODhGRkY2Qzg2NzgwOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkZFNUExQTYzOTE1RjExRURCRjA4OEZGRjZDODY3ODA4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkZFNUExQTY0OTE1RjExRURCRjA4OEZGRjZDODY3ODA4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQABgQEBAUEBgUFBgkGBQYJ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',
        legend: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAAAuCAIAAABCh0ElAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMC1jMDAxIDc5LmMwMjA0YjJkZWYsIDIwMjMvMDIvMDItMTI6MTQ6MjQgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVDNTc0RUQxMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVDNTc0RUQwMEU3NTExRUU5OUEwQ0Y1NjVENTg4RkJGIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCAyMDIzIE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjNGMTQxNDdEMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjNGMTQxNDdFMEM1ODExRUU5OUEwQ0Y1NjVENTg4RkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+flGY+gAAGw1JREFUeNrs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'
    };
    if (help.images) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"].extend(images, help.images);
    }
    const _html = `
        <div class='c-help__body' style="text-align: left;">
            <p>The provenance graph allows users to view the ancestors and descendants of a particular entity.</p>
            <h4>The Graph</h4>
            <img src="${images.theGraph}" alt="provenance graph" width="100%" />
            <p>The graph is fully interactive. Features include:</p>
            <ul>
                <li>
                    Users may drag (<i class='fa fa-arrows' role='presentation'></i>) nodes around.
                </li>
                <li>
                    Clicking any node reveals its <a href="#info-panel">info panel</a>.
                </li>
                <li>
                    The graph is zoomable. Zoom is activated by first clicking anywhere on the graph.
                    Use the mouse scroll wheel to control the zoom/scale of the graph. Zoom may be toggled via
                    the toggle button within the legend area. Zoom automatically deactivates once the graph is out of viewport.
                </li>
                ${help.theGraph || ''}
            </ul>
            <h5 class="mgn-v">Interactions &amp; Colors</h5>
            <table>
                <tr>
                    <th>Graphic</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td><img src="${images.currentNode}" alt="current node" /></td>
                    <td>Entity of the current page is denoted by a lime colored halo.</td>
                </tr>
                <tr>
                    <td><img src="${images.visitedNode}" alt="visited node" /></td>
                    <td>Visited nodes are denoted by a faint blue halo.</td>
                </tr>
                ${help.interactionAndColors || ''}
            </table>
            <h4 id="info-panel">The Info Panel</h4>
            <img src="${images.infoPanel}" alt="node info panel" width="100%" />
            <ul>
            <li>The info panel gives additional details about a particular node.</li>
            <li>Some detail cells link to their respective domain page, denoted by an external link icon (<i class='fa fa-external-link' role='presentation'></i>). </li>
            ${help.infoPanel || ''}
            </ul>
            <h4>The Legend</h4>
            <img src="${images.legend}" alt="provenance legengd" width="100%" />
            <ul>
              <li>Legend items are filterable, clicking on a legend item toggles the entity's color map highlight.</li>
              <li>The eye icon (<i class='fa fa-eye' role='presentation'></i>) after legend labels toggles the visibility of the respective item on the graph.</li>
              ${help.legend || ''}
            </ul>
            ${help.otherInfo || ''}
        </div>`;
    const [html] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(help.html || _html);
    return {
        html
    };
};
const __TURBOPACK__default__export__ = useHelpHtml;
}),
"[project]/src/lib/components/Legend.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__ = __turbopack_context__.i("[externals]/prop-types [external] (prop-types, cjs, [project]/node_modules/prop-types)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__ = __turbopack_context__.i("[externals]/jquery [external] (jquery, cjs, [project]/node_modules/jquery)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Toggle$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/Toggle.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$sweetalert2__$5b$external$5d$__$28$sweetalert2$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$sweetalert2$29$__ = __turbopack_context__.i("[externals]/sweetalert2 [external] (sweetalert2, cjs, [project]/node_modules/sweetalert2)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHelpHtml$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/hooks/useHelpHtml.jsx [ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const Legend = ({ children, colorMap, filterNodes = true, actionMap = {}, selectorId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTOR_ID"], className = '', help = {}, otherLegend = {} })=>{
    const [colors] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(colorMap);
    const [filterable] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(filterNodes);
    const { html } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$hooks$2f$useHelpHtml$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"])(help);
    const loaded = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (filterable && !loaded.current) setEvents();
    });
    const showHelp = ()=>{
        __TURBOPACK__imported__module__$5b$externals$5d2f$sweetalert2__$5b$external$5d$__$28$sweetalert2$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$sweetalert2$29$__["default"].fire({
            customClass: {
                container: 'c-help',
                title: 'c-help__title',
                confirmButton: 'c-help__btn'
            },
            width: help.width || 700,
            title: `${help.title || help.label}`,
            html: html,
            showCloseButton: true,
            confirmButtonText: 'Close'
        });
    };
    const setEvents = ()=>{
        loaded.current = true;
        const stickClass = 'has-activeFilters';
        const selectors = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTORS"].legend;
        const classFns = {
            add: 'addClass',
            remove: 'removeClass'
        };
        const getItem = (e)=>{
            return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(e.currentTarget).parents(selectors.legendItem);
        };
        const toggleClass = (e, fn = 'addClass', className = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover)=>{
            const $el = getItem(e);
            const node = $el.attr('data-filter') || $el.data('node');
            $el[fn](className).parent()[fn](className);
            (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId} .node--${node}`)[fn](className);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["isEdge"])($el)) {
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId}`).find('.links, #arrowhead')[fn](className);
            }
            if (!((0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId} .node`).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].hover) && fn === classFns.remove)) {
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId}`)[fn](className);
            }
        };
        const $trigger = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`.c-legend--${selectorId}  ${selectors.legendTrigger}`);
        $trigger.on('click', (e, data)=>{
            e.stopPropagation();
            e.preventDefault();
            if (!getItem(e).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled) || data?.force) {
                const fn = getItem(e).hasClass(stickClass) ? classFns.remove : classFns.add;
                toggleClass(e, fn);
                toggleClass(e, fn, stickClass);
                try {
                    const node = getItem(e).data('node');
                    if (fn === classFns.remove) {
                        delete window.ProvenanceTreeD3[selectorId].legendFilters[node];
                    } else {
                        window.ProvenanceTreeD3[selectorId].legendFilters[node] = true;
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        });
        $trigger.on('mouseover', (e)=>{
            if (!getItem(e).hasClass(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled)) {
                if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId}`).hasClass(stickClass)) toggleClass(e);
            }
        }).on('mouseleave', (e)=>{
            if (!(0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`#${selectorId}`).hasClass(stickClass)) toggleClass(e, 'removeClass');
        });
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"])(`.c-legend--${selectorId} .js-legend--help`).on('click', (e)=>{
            showHelp();
        });
    };
    const buildLegend = ()=>{
        let result = [];
        let helpLabel;
        if (help) {
            help.label = helpLabel = help.label || 'Help';
            colors[help.label] = 'transparent';
        }
        const isHelp = (key)=>key === helpLabel;
        const isOther = (key)=>otherLegend[key] !== undefined;
        const hasFilter = (key)=>otherLegend[key].filterValue !== undefined;
        const getColor = (key)=>typeof colors[key] === 'string' ? colors[key] : colors[key].color || 'transparent';
        const keyToClassName = (key)=>key.replaceAll(' ', '-');
        const getJsClassName = (key)=>isHelp(key) ? 'js-legend--help' : isOther(key) && !hasFilter(key) ? `js-legend--${keyToClassName(key)}` : 'js-legend--trigger';
        const getTitle = (key)=>isOther(key) && otherLegend[key].title ? otherLegend[key].title : null;
        let action;
        __TURBOPACK__imported__module__$5b$externals$5d2f$jquery__$5b$external$5d$__$28$jquery$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$jquery$29$__["default"].extend(colors, otherLegend);
        for(let key in colors){
            action = actionMap[key];
            result.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("li", {
                className: `c-legend__item c-legend__item--${keyToClassName(key)}  ${isHelp(key) || isOther(key) && !hasFilter(key) ? '' : 'js-legend__item'} ${action && action.disabled ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["CLASS_NAMES"].disabled : ''}`,
                "data-node": isOther(key) ? otherLegend[key].nodeKey || key : key,
                "data-filter": isOther(key) ? otherLegend[key].filterValue : undefined,
                onClick: isOther(key) && otherLegend[key].callback ? (e)=>otherLegend[key].callback(e, selectorId, key) : null,
                title: getTitle(key),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: `c-legend__color ${getJsClassName(key)} c-legend__color--${keyToClassName(key)}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                            style: {
                                backgroundColor: getColor(key)
                            },
                            className: otherLegend[key]?.iconContainerClass,
                            children: [
                                isHelp(key) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: "fa fa-question-circle-o",
                                    role: "presentation"
                                }, void 0, false, {
                                    fileName: "[project]/src/lib/components/Legend.jsx",
                                    lineNumber: 123,
                                    columnNumber: 45
                                }, ("TURBOPACK compile-time value", void 0)),
                                isOther(key) && otherLegend[key].icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("i", {
                                    className: `fa ${otherLegend[key].icon}`,
                                    role: "presentation"
                                }, void 0, false, {
                                    fileName: "[project]/src/lib/components/Legend.jsx",
                                    lineNumber: 124,
                                    columnNumber: 71
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/lib/components/Legend.jsx",
                            lineNumber: 122,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/lib/components/Legend.jsx",
                        lineNumber: 121,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "c-legend__label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: `c-legend__label__text ${getJsClassName(key)}`,
                                children: colors[key].name ? colors[key].name : key
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Legend.jsx",
                                lineNumber: 128,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)),
                            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Toggle$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                context: action.callback,
                                selectorId: action.selectorId || selectorId,
                                className: `c-legend__action ${action.className}`,
                                disabled: action.visible !== undefined ? !action.visible : action.disabled,
                                ariaLabel: action.ariaLabel
                            }, void 0, false, {
                                fileName: "[project]/src/lib/components/Legend.jsx",
                                lineNumber: 132,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/lib/components/Legend.jsx",
                        lineNumber: 127,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, `legend--${key}`, true, {
                fileName: "[project]/src/lib/components/Legend.jsx",
                lineNumber: 119,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)));
        }
        return result;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `c-legend c-legend--${selectorId} ${filterable ? 'c-legend--filterable' : ''} ${className}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("ul", {
            children: [
                buildLegend(),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/src/lib/components/Legend.jsx",
            lineNumber: 145,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/lib/components/Legend.jsx",
        lineNumber: 144,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
Legend.propTypes = {
    colorMap: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object.isRequired,
    help: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    otherLegend: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    actionMap: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    children: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].object,
    filterNodes: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].bool,
    selectorId: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string,
    className: __TURBOPACK__imported__module__$5b$externals$5d2f$prop$2d$types__$5b$external$5d$__$28$prop$2d$types$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$prop$2d$types$29$__["default"].string
};
const __TURBOPACK__default__export__ = Legend;
}),
"[project]/src/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AppContext.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$ProvenanceUI$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/ProvenanceUI.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Legend$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/components/Legend.jsx [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/neo4j/DataConverterNeo4J.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/js/constants.js [ssr] (ecmascript)");
;
;
;
;
;
;
;
function App() {
    const { contextData, options, loading } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AppContext$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"]);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const initialized = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (contextData !== null && (options.dontCheckInitialized || !initialized.current)) {
            initialized.current = true;
            setData(contextData);
        }
    }, [
        setData,
        contextData,
        options.dontCheckInitialized
    ]);
    const toggleData = (e, hideActivity, selectorId)=>{
        const ui = window.ProvenanceTreeD3[selectorId];
        ui.toggleData({
            filter: hideActivity ? 'Activity' : '',
            parentKey: hideActivity ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ENTITY : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$neo4j$2f$DataConverterNeo4J$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"].KEY_P_ACT
        });
    };
    const toggleEdgeLabels = (e, hideActivity, selectorId)=>{
        const ui = window.ProvenanceTreeD3[selectorId];
        ui.toggleEdgeLabels();
    };
    const actionMap = {
        Activity: {
            callback: toggleData,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Activity Nodes',
            disabled: true
        },
        Edge: {
            callback: toggleEdgeLabels,
            className: 'c-toggle--eye',
            ariaLabel: 'Toggle Edge Labels',
            visible: false
        }
    };
    const expandCb = ()=>{
        console.log('expanded');
    };
    const zoomCb = (e, selectorId)=>{
        const ui = window.ProvenanceTreeD3[selectorId];
        ui.disableZoom();
    };
    const otherLegend = {
        DatasetComponent: {
            iconContainerClass: 'c-help',
            icon: 'shape shape--blob',
            filterValue: 'CentralProcess',
            name: 'Data (Component)',
            title: 'Data (Component)'
        },
        Expand: {
            icon: 'fa-expand',
            callback: expandCb,
            title: 'Expand to full view'
        },
        ToggleZoom: {
            name: 'Toggle Lock',
            icon: 'fa-lock',
            callback: zoomCb,
            title: 'Toggle zooming and moving the graph'
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: `c-App`,
        children: [
            !loading && data && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$ProvenanceUI$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                data: data,
                options: options
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 81,
                columnNumber: 35
            }, this),
            options.colorMap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$components$2f$Legend$2e$jsx__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                colorMap: {
                    ...options.colorMap,
                    Edge: '#a5abb6'
                },
                otherLegend: otherLegend,
                className: "c-legend--flex c-legend--btns",
                help: {
                    title: 'Help, Provenance Graph',
                    infoPanel: '<li>Some entities have different shapes.</li>'
                },
                actionMap: actionMap,
                selectorId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$js$2f$constants$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["SELECTOR_ID"]
            }, void 0, false, {
                fileName: "[project]/src/pages/index.js",
                lineNumber: 82,
                columnNumber: 35
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/pages/index.js",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
const __TURBOPACK__default__export__ = App;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__056fab48._.js.map