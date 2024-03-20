import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FormLocal from "@/components/FormLocal";
import FormRecipe from "@/components/FormRecipe";

const page = () => {
  return (
    <div className="min-h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <FormLocal />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <FormRecipe />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default page;
