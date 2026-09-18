import { useEffect, useRef, useState } from "react";
import { api } from "../services/api";

/**
 * Subscribes to a project's live pipeline events over Server-Sent Events.
 * Calls onFinal when the pipeline reports its terminal event, so the caller
 * can refresh project/file state without this hook needing to know about it.
 */
export function useProjectEvents(projectId, onFinal) {
  const [events, setEvents] = useState([]);
  const esRef = useRef(null);

  useEffect(() => {
    setEvents([]);
    const es = new EventSource(api.eventsUrl(projectId));
    esRef.current = es;

    es.onmessage = (msg) => {
      let payload;
      try {
        payload = JSON.parse(msg.data);
      } catch (e) {
        return; // keep-alive/ping frames aren't JSON
      }
      if (!payload.type) return;
      setEvents((prev) => [...prev, payload]);
      if (payload.type === "final" && onFinal) onFinal(payload);
    };

    return () => es.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return events;
}
