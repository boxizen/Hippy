import Hippy from '@localTypes/hippy';
import DocumentNode from '../dom/document-node';
import Element from '../dom/element-node';
import View from '../dom/view-node';
const tagNameMap = new Map([
  // ["Focusable", ""],
  ["Image", "img"],
  ["ListView", "ul"],
  ["ListViewItem", "li"],
  ["Modal", "div"],
  ["Navigator", "div"],
  ["RefreshWrapper", "div"],
  ["ScrollView", "div"],
  ["TextInput", "div"],
  ["Text", "p"],
  ["ViewPager", "div"],
  ["View", "div"],
  ["WebView", "iframe"],
]);

export function native2Element(Document:DocumentNode, nativeLanguages: Hippy.NativeNode[]):void{
  let NodeMap = new Map();
  NodeMap.set(Document.nodeId, Document);
  Document.isMounted = true;
  let i = 0;
  let item:Hippy.NativeNode;
  for(; item = nativeLanguages[i]; i++){
    let name = item.name || "";
    let tagName = tagNameMap.get(name) || "div";
    if(name && tagName){
      let element = Document.createElement(tagName);
      element.meta.component.name = item.name;
      item.props && Object.keys(item.props).forEach((attr) => {
        switch (attr) {
          case 'style':
            element.style = item.props ? item.props.style : {}
            break;
          default: {
            element.setAttribute(attr, item.props[attr]);
          }
        }
      });
      element.nodeId = item.id;
      element.isMounted = true;
      NodeMap.set(item.id, element);
      let parent = NodeMap.get(item.pId);
      parent.appendChild(element);
    }
  }
}

export function commitTextUpdate(
  textInstance: Element,
  oldText: string,
  newText: string,
): void {
  textInstance.attributes.text = newText;
}
// -------------------
//     Hydration
// -------------------


const noop = ()=>{}

export function canHydrateInstance(
  instance: Element,
  type : String,
  props : any,
): Element|null {
  if (!instance.nodeId) {
    return null;
  }
  // This has now been refined to an element node.
  return instance;
}

export function canHydrateTextInstance(
  instance: Element,
  text: string,
): Element|null {
  if (text === '' || !instance.nodeId) {
    // Empty strings are not parsed by HTML so there won't be a correct match here.
    return null;
  }
  // This has now been refined to a text node.
  return instance;
}

export function canHydrateSuspenseInstance(
  instance: Element,
): null {
  return null;
}

export function isSuspenseInstancePending(instance: Element) {
  return false;
}

export function isSuspenseInstanceFallback(instance: Element) {
  return false;
}

export function registerSuspenseInstanceRetry(
  instance: Element,
  callback: () => void,
) {

}

function getNextHydratable(instance: (|View|null)): View | null {
  // Skip non-hydratable nodes.
  for (; instance != null; instance = instance.nextSibling) {
    if (instance.nodeId) {
      break;
    }
  }
  return instance;
}

export function getNextHydratableSibling(instance: View): View | null  {
  return getNextHydratable(instance.nextSibling);
}

export function getFirstHydratableChild(
  parentInstance: View,
): null | View {
  return getNextHydratable(parentInstance.firstChild);
}

export function hydrateInstance(
  instance: Element,
  type: string,
  props: any,
  rootContainerInstance: Document,
  hostContext: any,
  internalInstanceHandle: Object,
): null | [] {
  return null
}

export function hydrateTextInstance(
  textInstance: Element,
  text: string,
  internalInstanceHandle: Object,
): boolean {
  return textInstance.attributes.text !== text;
}

export function hydrateSuspenseInstance(
  suspenseInstance: any,
  internalInstanceHandle: Object,
) {
  
}

export function getNextHydratableInstanceAfterSuspenseInstance(
  suspenseInstance: any,
): null | Element {
  return null;
}

// Returns the SuspenseInstance if this node is a direct child of a
// SuspenseInstance. I.e. if its previous sibling is a Comment with
// SUSPENSE_x_START_DATA. Otherwise, null.
export function getParentSuspenseInstance(
  targetInstance: Element,
): null | any {
  return null;
}

export function commitHydratedContainer(container: DocumentNode): void {
  
}
// todo
export const commitHydratedSuspenseInstance = noop;
export const didNotMatchHydratedContainerTextInstance = noop;
export const didNotMatchHydratedTextInstance = noop;
export const didNotHydrateContainerInstance = noop;
export const didNotHydrateInstance = noop;
export const didNotFindHydratableContainerInstance = noop;
export const didNotFindHydratableContainerTextInstance = noop;
export const didNotFindHydratableContainerSuspenseInstance = noop;
export const didNotFindHydratableInstance = noop;
export const didNotFindHydratableTextInstance = noop;
export const didNotFindHydratableSuspenseInstance = noop;
export const mountResponderInstance = noop;
export const unmountResponderInstance = noop;
export const getFundamentalComponentInstance = noop;
export const mountFundamentalComponent = noop;
export const shouldUpdateFundamentalComponent = noop;
export const updateFundamentalComponent = noop;
export const unmountFundamentalComponent = noop;
export const getInstanceFromNode = noop;
