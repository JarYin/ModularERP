'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { UserRound, Plus, X } from 'lucide-react';
import TeamMember from './team-member/TeamMember';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/animate-ui/primitives/radix/dialog';
import InviteTeamMember from './InviteTeamMember';

export default function TeamMembersSection() {
  return (
    <Card className="border-border shadow-sm mt-8">
      <CardHeader className="border-b bg-muted/30">
        <CardTitle>
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-col">
              <div className="p-2 flex gap-3 items-center">
                <div className="bg-blue-500/10 rounded-lg p-2">
                  <UserRound size={22} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold">Team Members</h2>
              </div>
              <div className="text-sm text-muted-foreground mt-1 text-center md:text-left">
                Manage team members, roles, and permissions
              </div>
            </div>
            <Dialog>
              <DialogTrigger className="bg-white rounded flex items-center text-black h-9 md:ml-auto mt-2 md:mt-0 shadow px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 border border-transparent hover:border-gray-200">
                <Plus size={16} className="mr-1" />
                Add Team Member
              </DialogTrigger>

              <DialogPortal>
                <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
                <DialogContent className="sm:max-w-md fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 border bg-background p-6">
                  <DialogHeader>
                    <DialogTitle className="text-lg">
                      Invite Team Member
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground mb-2">
                      Send an invitation to join your organization
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mb-2">
                    <InviteTeamMember />
                  </div>

                  <DialogFooter>
                    <button className="bg-primary text-primary-foreground px-4 py-2 text-sm">
                      Accept
                    </button>
                  </DialogFooter>

                  <DialogClose className="absolute top-4 right-4">
                    <X className="size-4 cursor-pointer" />
                    <span className="sr-only">Close</span>
                  </DialogClose>
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-8">
        <TeamMember />
      </CardContent>
    </Card>
  );
}