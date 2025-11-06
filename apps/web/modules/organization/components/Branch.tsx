import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Branch() {
  return (
    <>
      <Card className="border-border shadow-sm ">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle>
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-col">
                <div className="p-2 flex gap-3 items-center">
                  <div className="bg-blue-500/10 rounded-lg p-2">
                    <Image
                      src="/office.png"
                      alt="Branch"
                      height={25}
                      width={25}
                    />
                  </div>
                  <h2 className="text-xl font-semibold">Branch</h2>
                </div>
                <div className="text-sm text-muted-foreground mt-1 text-center md:text-left">
                  Manage organization branches
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
}
