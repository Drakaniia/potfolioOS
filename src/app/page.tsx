import { Dock, DockIcon } from "@/components/ui/dock";
import { Topbar } from "@/components/ui/topbar";
import { MediaPlayer } from "@/components/ui/media-player";
import { TimeWidget } from "@/components/ui/time-widget";

export default function Home() {
  return (
    <div className="flex flex-col h-screen font-sans relative">
      {/* macOS-style Topbar */}
      <Topbar />
      
      <main className="flex flex-1 w-full pt-20 overflow-hidden">
        {/* Center - Portfolio OS content */}
        <div className="flex-1 flex items-center justify-center">
          {/* Portfolio OS content will go here */}
        </div>
        
        {/* Media Player - Absolutely positioned */}
        <MediaPlayer />
        {/* Time Widget - Absolutely positioned */}
        <TimeWidget />
      </main>
      
      {/* Mac-style Dock */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Dock className="backdrop-blur-xl bg-white/10 border border-white/20">
          <DockIcon name="Finder" href="#finder" src="/finder.png" />
          <DockIcon name="Launchpad" href="#launchpad" src="/launchpad.png" />
          <DockIcon name="Notes" href="#notes" src="/notes.png" />
          <DockIcon name="Photos" href="#photos" src="/photos.png" />
          <DockIcon name="Slack" href="#slack" src="/slack.png" />
          <DockIcon name="Settings" href="#settings" src="/settings.png" />
        </Dock>
      </div>
    </div>
  );
}
