import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

/**
 * Collapsible
 * Root container for collapsible content
 * Built on top of Radix UI for accessibility
 */
const Collapsible = CollapsiblePrimitive.Root;

/**
 * CollapsibleTrigger
 * Button or element that toggles the collapsible state
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

/**
 * CollapsibleContent
 * Content that expands and collapses
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
