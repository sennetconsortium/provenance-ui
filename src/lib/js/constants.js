export const SELECTOR_ID = 'provenanceTree'

export const isEdge = ($el) => {
    return $el.data('node') === 'Edge'
}

export const CLASS_NAMES = {
    disabled: 'is-disabled',
    hover: 'has-hover',
    toggled: 'has-toggled'
}

export const SELECTORS = {
    legend: {
        legendItem: '.js-legend__item',
        legendTrigger: '.js-legend--trigger',
        provenance: '.js-provenance'
    }
}

