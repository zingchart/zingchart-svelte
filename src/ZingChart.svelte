<script context="module">
	// 'global' counter of zingchart-svelte instances
	let zcCount = 0
</script>

<script>
	/*
	 * ZingChart Svelte component
	 *
	 * All properties set on this component are added to the
	 * configuration object passed to zingchart.render().
	 *
	 * ZingChart methods can be invoked using exec() on a 
	 * reference (obtained via bind:this) to a ZingChart 
	 * Svelte component. For example, a zingchart method
	 * call like
	 *   
	 *    zingchart.exex('myid', 'colorscale.setvalue', {value: 20})
	 *
	 * would be invoked like this:
	 *
	 *     let chart
	 *     <ZingChart bind:this={chart} .... />
	 *
	 *     chart.exec('colorscale.setvalue', {value: 20})
	 */
	import {onDestroy, onMount} from 'svelte'
	import zingchart from 'zingchart/es6'
	import constants from 'zingchart-constants'

	const { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_OUTPUT, EVENT_NAMES } = constants


	export let data = {}
	export let series = []
	export let id = `zingchart-svelte-${zcCount++}`
	export let width = DEFAULT_WIDTH
	export let height = DEFAULT_HEIGHT
	export let output = DEFAULT_OUTPUT

	/* Properties that should be defaulted if not set */
	const defaultProps = {width, height, output}

	onMount(() => {
		bindAllEvents()
		renderChart()
	})

	onDestroy(() => {
		zingchart.exec(id, 'destroy')
	})

	// React to a data change
	$: zingchart.exec(id, 'setdata', {data: data})

	// React to a series change
	$: zingchart.exec(id, 'setseriesdata', {
		graphid: 0,
		plotindex: 0,
		data: series
	})

	// React to a width or height change
	$: zingchart.exec(id, 'resize', {
		width: width || DEFAULT_WIDTH,
		height: height || DEFAULT_HEIGHT
	})

	/*
	 * External function to execute something on the zingchart
	 */
	export const exec = (name, args) => window.zingchart.exec(id, name, args)

	/*
	 * Bind all events listed in the props
	 */
	function bindAllEvents() {
		for(const eventName in $$props) {
			if(!bindEvent(eventName)) {
				// Replace '_' with '.' and attempt again
				let newEventName = eventName.replace(/_/g, '.')
				bindEvent(newEventName, eventName)
			}
		}
	}

	/*
	 * Bind a single event. It may have an alternate
	 * name, in which case the original name should be
	 * provided. Return true if successful.
	 *
	 * The event name must be present in the event list
	 * obtained from zingchart-constants.
	 */
	function bindEvent(eventName, originalEventName) {
		if(!EVENT_NAMES.includes(eventName)) return false

		const ev = originalEventName || eventName
		window.zingchart.bind(id, eventName, result => $$props[ev](result))

		return true
	}
	
	/*
	 * Render the chart, initializing the renderObject to the default props
	 * plus all of the properties provided to this component.
	 */
	function renderChart() {
    const renderObject = {...defaultProps, ...$$props}

    // Overwrite some existing props.
    renderObject.id = id
    renderObject.data = data

    if (renderObject.series) {
      renderObject.data.series = renderObject.series
    }
    if (renderObject.theme) {
      renderObject.defaults = renderObject.theme
    }
    if (renderObject.modules) {
      renderObject.modules = renderObject.modules
    }

    zingchart.render(renderObject)
  }

</script>

<div id={id} style="width: {width}; height: {height};" />