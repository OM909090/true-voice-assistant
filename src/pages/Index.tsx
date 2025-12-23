import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ComponentsSection } from "@/components/sections/ComponentsSection";
import { DatabaseSection } from "@/components/sections/DatabaseSection";
import { VoiceAgentSection } from "@/components/sections/VoiceAgentSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { ModelsSection } from "@/components/sections/ModelsSection";
import { CallerIDSection } from "@/components/sections/CallerIDSection";
import { CallAutomationSection } from "@/components/sections/CallAutomationSection";
import { CallLogsSection } from "@/components/sections/CallLogsSection";
import { APISection } from "@/components/sections/APISection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { RoadmapSection } from "@/components/sections/RoadmapSection";

const sections: Record<string, { title: string; subtitle: string; component: React.ComponentType }> = {
  architecture: {
    title: "TRUE AI - System Architecture",
    subtitle: "Next-Generation AI-Powered Caller ID & Voice Agent Platform",
    component: ArchitectureSection,
  },
  components: {
    title: "TRUE AI - Core Components",
    subtitle: "Key features and capabilities of the platform",
    component: ComponentsSection,
  },
  database: {
    title: "TRUE AI - Database Schema",
    subtitle: "Data models and storage architecture",
    component: DatabaseSection,
  },
  "voice-agent": {
    title: "TRUE AI - Voice AI Agent",
    subtitle: "Multi-language voice assistant with agentic capabilities",
    component: VoiceAgentSection,
  },
  tools: {
    title: "TRUE AI - Tool Definitions",
    subtitle: "AI agent tool registry and function schemas",
    component: ToolsSection,
  },
  models: {
    title: "TRUE AI - Pluggable Models",
    subtitle: "Configurable AI providers and model settings",
    component: ModelsSection,
  },
  "caller-id": {
    title: "TRUE AI - Caller ID System",
    subtitle: "Real-time caller identification and spam detection",
    component: CallerIDSection,
  },
  "call-automation": {
    title: "TRUE AI - Call Automation",
    subtitle: "Intelligent call handling and voice messaging",
    component: CallAutomationSection,
  },
  "call-logs": {
    title: "TRUE AI - Call Logs",
    subtitle: "Voice-first call history and analytics",
    component: CallLogsSection,
  },
  api: {
    title: "TRUE AI - API Contracts",
    subtitle: "REST API endpoints and request/response schemas",
    component: APISection,
  },
  security: {
    title: "TRUE AI - Security & Privacy",
    subtitle: "Encryption, permissions, and data privacy model",
    component: SecuritySection,
  },
  roadmap: {
    title: "TRUE AI - Development Roadmap",
    subtitle: "MVP to V2 implementation timeline",
    component: RoadmapSection,
  },
};

const Index = () => {
  const [activeSection, setActiveSection] = useState("architecture");
  const currentSection = sections[activeSection] || sections.architecture;
  const SectionComponent = currentSection.component;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="ml-72">
        <Header title={currentSection.title} subtitle={currentSection.subtitle} />
        
        <div className="p-8">
          <SectionComponent />
        </div>
      </main>
    </div>
  );
};

export default Index;
