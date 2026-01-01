import { FabricObject, Path, Rect, FabricImage, FabricText } from 'fabric';

// declare the methods for typescript
declare module "fabric" {
    // to have the properties recognized on the instance and in the constructor
    interface FabricObject {
        "original_fill": string;
        "original_stroke": string;
        "zaparoo-placeholder"?: "main";
        "zaparoo-no-print"?: "true";
        "zaparoo-fill-strategy"?: "fit" | "cover";
        "zaparoo-align-strategy"?: "left-top" | "center-top"
    }

    interface FabricImage {
        "resourceType"?: "main" | "screenshot" | "platform_logo";
    }
}

export const setupFabricJSCustomConfiguration = () => {

    const customOptions: Partial<typeof FabricObject["ownDefaults"]> = {
        originX: 'center',
        originY: 'center',
        objectCaching: false,
        cornerSize: 16,
        lockScalingFlip: true,
        cornerStrokeColor: 'rgb(223,17,178)',
        transparentCorners: false,
        cornerStyle: 'circle',
        borderScaleFactor: 2,
        cornerColor: 'rgb(255,185,72)',
        borderColor: 'rgb(14,135,255)',
    }

    Object.assign(FabricObject.ownDefaults, customOptions);
    const extra_attrs = ['id', 'zaparoo-placeholder', 'zaparoo-fill-strategy', 'zaparoo-no-print', 'zaparoo-align-strategy'];
    /* add the ability to parse 'id' and zaparoo attributes to shapes */
    Rect.ATTRIBUTE_NAMES = [...Rect.ATTRIBUTE_NAMES, ...extra_attrs];
    FabricText.ATTRIBUTE_NAMES = [...FabricText.ATTRIBUTE_NAMES, ...extra_attrs];
    Path.ATTRIBUTE_NAMES = [...Path.ATTRIBUTE_NAMES, ...extra_attrs];
    FabricImage.ATTRIBUTE_NAMES = [...FabricImage.ATTRIBUTE_NAMES, ...extra_attrs];
    FabricObject.customProperties = [
        'zaparoo-placeholder',
        'id',
        'zaparoo-fill-strategy',
        'original_stroke',
        'original_fill',
        'zaparoo-no-print',
        'zaparoo-align-strategy',
    ];

    FabricImage.customProperties = [...FabricObject.customProperties,
        'resourceType',
    ];
}