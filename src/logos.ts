import { EditType, type EditResource, type ResourceArray } from './resourcesTypedef';


export const logos: ResourceArray[] = [];

export const logoResource: EditResource = {
  data: logos,
  type: EditType.image,
}