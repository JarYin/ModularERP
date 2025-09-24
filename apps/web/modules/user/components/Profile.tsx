import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export default function Profile() {
  return (
    <div className="flex justify-center items-center bg-muted/30 p-6">
      <Card className="w-full shadow-lg rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://i.pravatar.cc/150?u=me"
              alt="User Avatar"
            />
            <AvatarFallback>GG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between">
              <CardTitle className="text-2xl font-semibold">John Doe</CardTitle>
              <div>
                <Button variant={'outline'}>Edit</Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground flex gap-1 items-center">
              <Mail size={18}/> john.doe@example.com
            </p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
