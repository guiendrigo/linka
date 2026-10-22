import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { cleanBioIdentity, parsePhotoBase64 } from "@/lib/linka/bio";
import { cleanCredentials, cleanProduct } from "@/lib/linka/input";
import type { BioPageView, StockReport, WorkspaceProduct, WorkspaceView } from "@/lib/linka/store.server";

export const getWorkspace = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<WorkspaceView> => {
    const { loadWorkspace } = await import("@/lib/linka/store.server");
    return loadWorkspace(context.userId);
  });

export const saveShopeeCredentials = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    return cleanCredentials({
      appId: typeof body.appId === "string" ? body.appId : "",
      secret: typeof body.secret === "string" ? body.secret : "",
    });
  })
  .handler(async ({ context, data }) => {
    const { saveCredentials } = await import("@/lib/linka/store.server");
    await saveCredentials(context.userId, data.appId, data.secret);
    return { ok: true as const };
  });

export const removeShopeeCredentials = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { clearCredentials } = await import("@/lib/linka/store.server");
    await clearCredentials(context.userId);
    return { ok: true as const };
  });

export const addProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
    return cleanProduct({
      title: typeof body.title === "string" ? body.title : "",
      price: typeof body.price === "string" ? body.price : "",
      commission: typeof body.commission === "string" ? body.commission : "",
      offers,
    });
  })
  .handler(async ({ context, data }): Promise<WorkspaceProduct> => {
    const { createProduct } = await import("@/lib/linka/store.server");
    return createProduct(context.userId, data);
  });

export const editProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) {
      throw new Error("Produto inválido.");
    }
    const offers = Array.isArray(body.offers) ? body.offers.map(asOffer) : [];
    return {
      id: body.id,
      product: cleanProduct({
        title: typeof body.title === "string" ? body.title : "",
        price: typeof body.price === "string" ? body.price : "",
        commission: typeof body.commission === "string" ? body.commission : "",
        offers,
      }),
    };
  })
  .handler(async ({ context, data }): Promise<WorkspaceProduct> => {
    const { updateProduct } = await import("@/lib/linka/store.server");
    return updateProduct(context.userId, data.id, data.product);
  });

export const refreshStock = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => ({ force: asRecord(data).force === true }))
  .handler(async ({ context, data }): Promise<StockReport> => {
    const { checkStock } = await import("@/lib/linka/store.server");
    return checkStock(context.userId, { force: data.force });
  });

export const removeProduct = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const id = asRecord(data).id;
    if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id)) throw new Error("Produto inválido.");
    return id;
  })
  .handler(async ({ context, data }) => {
    const { deleteProduct } = await import("@/lib/linka/store.server");
    await deleteProduct(context.userId, data);
    return { ok: true as const };
  });

export const toggleOfferStock = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) {
      throw new Error("Oferta inválida.");
    }
    if (typeof body.inStock !== "boolean") throw new Error("Estoque inválido.");
    return { id: body.id, inStock: body.inStock };
  })
  .handler(async ({ context, data }) => {
    const { setOfferStock } = await import("@/lib/linka/store.server");
    await setOfferStock(context.userId, data.id, data.inStock);
    return { ok: true as const };
  });

export const saveBioPage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    return cleanBioIdentity({
      title: typeof body.title === "string" ? body.title : "",
      description: typeof body.description === "string" ? body.description : "",
    });
  })
  .handler(async ({ context, data }): Promise<BioPageView> => {
    const { saveBioIdentity } = await import("@/lib/linka/store.server");
    return saveBioIdentity(context.userId, data);
  });

export const saveBioPagePhoto = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    const image = typeof body.image === "string" ? body.image : "";
    parsePhotoBase64(image);
    return image;
  })
  .handler(async ({ context, data }): Promise<BioPageView> => {
    const parsed = parsePhotoBase64(data);
    const { saveBioPhoto } = await import("@/lib/linka/store.server");
    return saveBioPhoto(context.userId, parsed.mime, parsed.bytes);
  });

export const setBioVisible = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: unknown) => {
    const body = asRecord(data);
    if (typeof body.id !== "string" || !/^[0-9a-f-]{36}$/i.test(body.id)) {
      throw new Error("Produto inválido.");
    }
    if (typeof body.visible !== "boolean") throw new Error("Visibilidade inválida.");
    return { id: body.id, visible: body.visible };
  })
  .handler(async ({ context, data }) => {
    const { setProductBioVisible } = await import("@/lib/linka/store.server");
    await setProductBioVisible(context.userId, data.id, data.visible);
    return { ok: true as const };
  });

function asRecord(data: unknown): Record<string, unknown> {
  if (!data || typeof data !== "object" || Array.isArray(data)) return {};
  return data as Record<string, unknown>;
}

function asOffer(value: unknown) {
  const body = asRecord(value);
  return {
    shop: typeof body.shop === "string" ? body.shop : "",
    url: typeof body.url === "string" ? body.url : "",
    inStock: body.inStock !== false,
  };
}
