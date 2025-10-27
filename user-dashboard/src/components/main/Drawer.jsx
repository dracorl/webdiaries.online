import Menu from "./Menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import {VisuallyHidden} from "@radix-ui/react-visually-hidden"

const Drawer = ({isOpen, onOpenChange}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="font-arOne w-64 p-0 pt-2"
        aria-describedby="drawer-description"
      >
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription id="drawer-description">
            Main application navigation links
          </SheetDescription>
        </VisuallyHidden>

        <div className="h-full">
          <Menu open={isOpen} onOpenChange={onOpenChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Drawer
