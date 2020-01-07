/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { dispatch } = wp.data;
const { Fragment } = wp.element;
const { ToggleControl } = wp.components;

const DevicesOptions = ( props ) => {
	const {
		clientId,
		attributes,
		reloadModal,
	} = props;

	const {
		sidetrack,
	} = attributes;

	const onSelectDevice = ( device ) => {
		const newValue = ! sidetrack[ device ];

		delete sidetrack[ device ];

		const blockOptions = Object.assign( { [ device ]: newValue }, sidetrack );

		dispatch( 'core/block-editor' ).updateBlockAttributes( clientId, { sidetrack: blockOptions } );

		if ( reloadModal ) {
			reloadModal();
		}
	};

	if ( typeof sidetrack === 'undefined' ) {
		return;
	}

	return (
		<Fragment>
			<ToggleControl
				label={ __( 'Hide on Desktop', 'blockshop-options' ) }
				checked={ typeof sidetrack.desktop !== 'undefined' && ! sidetrack.desktop }
				onChange={ () => onSelectDevice( 'desktop' ) }
			/>
			<ToggleControl
				label={ __( 'Hide on Tablet', 'blockshop-options' ) }
				checked={ typeof sidetrack.tablet !== 'undefined' && ! sidetrack.tablet }
				onChange={ () => onSelectDevice( 'tablet' ) }
			/>
			<ToggleControl
				label={ __( 'Hide on Mobile', 'blockshop-options' ) }
				checked={ typeof sidetrack.mobile !== 'undefined' && ! sidetrack.mobile }
				onChange={ () => onSelectDevice( 'mobile' ) }
			/>
		</Fragment>
	);
};

export default DevicesOptions;
