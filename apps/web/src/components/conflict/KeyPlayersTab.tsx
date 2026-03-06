import Image from "next/image";
import type { Actor } from "@/types";

interface KeyPlayersTabProps {
  actors: Actor[];
}

const ROLE_ORDER = ["attacker", "defender", "mediator", "ally", "other"];

const roleBadgeColor: Record<string, string> = {
  attacker: "bg-red-900/50 text-red-400 border-red-800",
  defender: "bg-blue-900/50 text-blue-400 border-blue-800",
  mediator: "bg-green-900/50 text-green-400 border-green-800",
  ally: "bg-amber-900/50 text-amber-400 border-amber-800",
  other: "bg-gray-800/50 text-gray-400 border-gray-700",
};

export default function KeyPlayersTab({ actors }: KeyPlayersTabProps) {
  if (actors.length === 0) {
    return <p className="text-gray-500 italic">No actors data available.</p>;
  }

  const grouped = actors.reduce<Record<string, Actor[]>>((acc, actor) => {
    const role = actor.role || "other";
    if (!acc[role]) acc[role] = [];
    acc[role].push(actor);
    return acc;
  }, {});

  const sortedRoles = Object.keys(grouped).sort(
    (a, b) =>
      (ROLE_ORDER.indexOf(a) === -1 ? 99 : ROLE_ORDER.indexOf(a)) -
      (ROLE_ORDER.indexOf(b) === -1 ? 99 : ROLE_ORDER.indexOf(b))
  );

  return (
    <div className="space-y-10">
      {sortedRoles.map((role) => (
        <section key={role}>
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide capitalize">
              {role}s
            </h3>
            <span className="text-xs text-gray-600">
              {grouped[role].length} actor{grouped[role].length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {grouped[role].map((actor) => (
              <ActorCard key={actor.id} actor={actor} role={role} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ActorCard({ actor, role }: { actor: Actor; role: string }) {
  const badge = roleBadgeColor[role] ?? roleBadgeColor.other;

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 flex flex-col">
      {/* Header: flag/logo + name + badges */}
      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
          {actor.logoUrl ? (
            <Image
              src={actor.logoUrl}
              alt={actor.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : actor.countryCode ? (
            getFlagEmoji(actor.countryCode)
          ) : (
            <span className="text-gray-600 text-sm font-bold">
              {actor.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-medium text-gray-200 truncate">{actor.name}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 capitalize">{actor.type}</span>
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded border capitalize ${badge}`}
            >
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {actor.description && (
        <p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-4">
          {actor.description}
        </p>
      )}

      {/* Objectives */}
      {actor.statedObjectives && (
        <div className="mt-auto pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-gray-400">Objectives:</span>{" "}
            {actor.statedObjectives}
          </p>
        </div>
      )}

      {/* Involvement dates */}
      {(actor.involvementStart || actor.involvementEnd) && (
        <p className="text-[11px] text-gray-600 mt-2">
          {actor.involvementStart &&
            `From ${new Date(actor.involvementStart).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}`}
          {actor.involvementStart && actor.involvementEnd && " — "}
          {actor.involvementEnd &&
            `To ${new Date(actor.involvementEnd).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}`}
        </p>
      )}
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const code = countryCode.toUpperCase();
  return String.fromCodePoint(
    ...Array.from(code).map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)
  );
}
