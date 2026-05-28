import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/logo-white.svg" alt="Prime Property" width={170} height={62} priority className="h-10 w-auto" />
    </div>
  );
}

export function LogoDark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image src="/logo.svg" alt="Prime Property" width={170} height={62} priority className="h-10 w-auto" />
    </div>
  );
}
