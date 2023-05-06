import { type Ref } from 'vue'
import SplitType  from 'split-type'


export interface SplitTypeLogic {
  /**
   * Text splitting callable.
   */
  split: ((options?: any) => SplitType)
}

/**
 * Split type composable which takes a (undefined)
 * Vue template ref and returns an object with a
 * text splitting callable.
 * 
 * @param templateRef Ref<Element> 
 * @returns SplitTypeLogic
 */
export const useSplitType = <T extends HTMLElement>(
  templateRef: Ref<T>
): SplitTypeLogic => {
  const logic = {
    split: (options?: any) => {
      return new SplitType(templateRef.value, options)
    }
  }
  return logic
}
