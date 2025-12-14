import { FabricObject, Path, Rect, FabricImage } from 'fabric';

// declare the methods for typescript
declare module "fabric" {
    // to have the properties recognized on the instance and in the constructor
    interface FabricObject {
        "original_fill": string;
        "original_stroke": string;
        "zaparoo-placeholder"?: "main";
        "zaparoo-no-print"?: "true";
        "zaparoo-fill-strategy"?: "fit" | "cover";
    }

    interface FabricImage {
        "resourceType"?: "main" | "screenshot" | "logo";
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

    /* add the ability to parse 'id' and zaparoo attributes to shapes */
    Rect.ATTRIBUTE_NAMES = [...Rect.ATTRIBUTE_NAMES, 'id', 'zaparoo-placeholder', 'zaparoo-fill-strategy', 'zaparoo-no-print'];
    Path.ATTRIBUTE_NAMES = [...Path.ATTRIBUTE_NAMES, 'id', 'zaparoo-placeholder', 'zaparoo-fill-strategy', 'zaparoo-no-print'];
    FabricImage.ATTRIBUTE_NAMES = [...FabricImage.ATTRIBUTE_NAMES, 'id', 'zaparoo-no-print'];
    FabricObject.customProperties = [
        'zaparoo-placeholder',
        'id',
        'zaparoo-fill-strategy',
        'original_stroke',
        'original_fill',
        'zaparoo-no-print'
    ];

    FabricImage.customProperties = [
        'resourceType',
        'original_stroke',
        'original_fill',
        'zaparoo-no-print'
    ];
}