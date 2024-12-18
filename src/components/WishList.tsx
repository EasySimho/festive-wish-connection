import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface WishListProps {
  viewMode: "mine" | "partner";
}

interface Wish {
  id: string;
  title: string;
  description: string;
  price?: number;
  claimed: boolean;
  user_id: string;
  created_at: string;
}

export function WishList({ viewMode }: WishListProps) {
  const { toast } = useToast();

  const { data: wishes, isLoading } = useQuery({
    queryKey: ["wishes", viewMode],
    queryFn: async () => {
      const { data, error } = await fetch("/api/wishes").then((res) =>
        res.json()
      );
      if (error) throw error;
      return data as Wish[];
    },
  });

  const handleClaimWish = async (wishId: string) => {
    try {
      await fetch(`/api/wishes/${wishId}/claim`, {
        method: "POST",
      });
      toast({
        title: "Wish claimed!",
        description: "The wish has been marked as claimed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim the wish. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading wishes...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wishes?.map((wish) => (
        <Card
          key={wish.id}
          className="border-[#2F5233]/20 hover:border-[#2F5233]/40 transition-colors"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-semibold text-[#1F2937] flex items-center gap-2">
              <Gift className="h-5 w-5 text-[#ea384c]" />
              {wish.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#1F2937]/80 mb-4">{wish.description}</p>
            {wish.price && (
              <p className="text-[#D4AF37] font-semibold mb-4">
                ${wish.price.toFixed(2)}
              </p>
            )}
            {viewMode === "partner" && !wish.claimed && (
              <Button
                onClick={() => handleClaimWish(wish.id)}
                className="w-full bg-[#2F5233] hover:bg-[#2F5233]/90 text-white"
              >
                <Check className="mr-2 h-4 w-4" /> Claim this wish
              </Button>
            )}
            {viewMode === "partner" && wish.claimed && (
              <Button
                disabled
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white cursor-not-allowed"
              >
                <Check className="mr-2 h-4 w-4" /> Claimed
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}