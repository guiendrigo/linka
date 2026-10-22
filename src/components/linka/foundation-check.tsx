import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { TextInput } from "@astryxdesign/core/TextInput";
import { VStack } from "@astryxdesign/core/VStack";

/** Temporary layer-order smoke. Open `/?foundation=1`. */
export function FoundationCheck() {
  const [email, setEmail] = useState("");

  return (
    <div data-foundation-check>
      <VStack gap={4}>
        <Button label="Primary action" variant="primary" />
        <TextInput label="Email" placeholder="você@exemplo.com" value={email} onChange={setEmail} />
        <Card>One card with default padding</Card>
      </VStack>
    </div>
  );
}
