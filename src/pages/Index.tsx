import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WishList } from "@/components/WishList";
import { AddWishDialog } from "@/components/AddWishDialog";
import { useState } from "react";

const Index = () => {
  const [viewMode, setViewMode] = useState<"mine" | "partner">("mine");

  return (
    <div className="min-h-screen bg-[#FEF7E4] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="border-[#2F5233] bg-white/90 backdrop-blur">
          <CardHeader className="text-center border-b border-[#2F5233]/20 pb-6">
            <CardTitle className="text-4xl font-bold text-[#2F5233]">
              Christmas Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "mine" ? "default" : "outline"}
                  onClick={() => setViewMode("mine")}
                  className="bg-[#ea384c] hover:bg-[#ea384c]/90 text-white"
                >
                  My Wishes
                </Button>
                <Button
                  variant={viewMode === "partner" ? "default" : "outline"}
                  onClick={() => setViewMode("partner")}
                  className="bg-[#2F5233] hover:bg-[#2F5233]/90 text-white"
                >
                  Partner's Wishes
                </Button>
              </div>
              <AddWishDialog />
            </div>
            <WishList viewMode={viewMode} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;