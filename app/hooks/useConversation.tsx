import { useParams } from "next/navigation";
import React, { useMemo } from "react";

function useConversation() {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return null;
    }

    return params?.conversationId;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [params?.conversationId]);

  return useMemo(
    () => ({
      isOpen,
      conversationId,
    }),
    [isOpen, conversationId]
  );
}

export default useConversation;
