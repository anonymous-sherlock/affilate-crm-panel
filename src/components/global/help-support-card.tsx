import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

type Props = {};

export const HelpSupportCard = (props: Props) => {
  return (
    <Card className="mx-1 my-4 border border-card-border bg-gradient-to-tl from-primary via-primary/30 to-primary/5 shadow-none">
      <CardHeader>
        <CardTitle>Help & Support</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Get help and support for your account and transactions.</p>
      </CardContent>
      <CardFooter>
        <Button>Go to Help & Support</Button>
      </CardFooter>
    </Card>
  );
};
