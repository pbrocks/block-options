/**
 * Internal dependencies
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { applyFormat, isCollapsed, toggleFormat } = wp.richText;
const { decodeEntities } = wp.htmlEntities;
const { RichTextToolbarButton } = wp.blockEditor;
const { Tooltip, Button } = wp.components;
 
const MyTooltip = () => (
    <Tooltip text="More information">
        <Button isSecondary>
            Hover for more information
        </Button>
    </Tooltip>
);
/**
 * Block constants
 */
const name = 'editorskit/tooltip';
 
const MyCustomButton = ( props ) => {
    return <RichTextToolbarButton
        icon='editor-code'
        title='Tooltip output'
        onClick={ () => {
            props.onChange( toggleFormat(
                props.value,
                name
            ) );
        } }
        isActive={ props.isActive }
    />;
};


export const toolTip = {
	name,
    title: 'Tooltip output',
    tagName: 'samp1',
    className: null,
    edit: MyCustomButton,
};

