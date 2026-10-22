import assert from "node:assert/strict";
import test from "node:test";
import {
  resolveAffiliateCredential,
  resolveShopAuthorization,
} from "./shopee/credentials.server.ts";

function withEnv(values: { appId?: string; secret?: string }, run: () => void) {
  const previousId = process.env.SHOPEE_AFFILIATE_APP_ID;
  const previousSecret = process.env.SHOPEE_AFFILIATE_SECRET;
  if (values.appId == null) delete process.env.SHOPEE_AFFILIATE_APP_ID;
  else process.env.SHOPEE_AFFILIATE_APP_ID = values.appId;
  if (values.secret == null) delete process.env.SHOPEE_AFFILIATE_SECRET;
  else process.env.SHOPEE_AFFILIATE_SECRET = values.secret;
  try {
    run();
  } finally {
    if (previousId == null) delete process.env.SHOPEE_AFFILIATE_APP_ID;
    else process.env.SHOPEE_AFFILIATE_APP_ID = previousId;
    if (previousSecret == null) delete process.env.SHOPEE_AFFILIATE_SECRET;
    else process.env.SHOPEE_AFFILIATE_SECRET = previousSecret;
  }
}

test("as duas env viram credencial da plataforma", () => {
  withEnv({ appId: "app-1", secret: "secret-value" }, () => {
    assert.deepEqual(resolveAffiliateCredential("user-a"), {
      source: "platform",
      appId: "app-1",
      secret: "secret-value",
    });
  });
});

test("só App ID ou só segredo não conta", () => {
  withEnv({ appId: "app-1" }, () => {
    assert.equal(resolveAffiliateCredential("user-a"), null);
  });
  withEnv({ secret: "secret-value" }, () => {
    assert.equal(resolveAffiliateCredential("user-a"), null);
  });
});

test("sem env não há credencial", () => {
  withEnv({}, () => {
    assert.equal(resolveAffiliateCredential("user-a"), null);
  });
});

test("autorização da loja ainda não existe", () => {
  assert.equal(resolveShopAuthorization("user-a", "123"), null);
});
