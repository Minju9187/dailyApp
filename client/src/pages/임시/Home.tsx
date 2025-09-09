import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <Card className="bg-card rounded-2xl">
        <CardContent>오늘의 날씨</CardContent>
      </Card>
      <Card className="bg-card rounded-2xl">
        <CardContent>오늘의 할일</CardContent>
      </Card>
    </>
  );
}
