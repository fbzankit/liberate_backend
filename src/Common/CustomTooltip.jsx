import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import images from '../Utility/Images';

const CustomTooltip = ({placement,description}) => {
    return (
        <>
            <OverlayTrigger
                placement={placement}
                overlay={
                    <Tooltip id={`tooltip-${placement}`}>
                        {/* Tooltip on <strong>{placement}</strong>. */}
                        {description}
                    </Tooltip>
                }
            >
                <img src={images.tooltipIcon} alt="tooltip" />
            </OverlayTrigger>
        </>
    );
}

export default CustomTooltip;