import Vapi from "@vapi-ai/web";

let vapiInstance = null;

export function getVapiInstance() {
  if (!vapiInstance) {
    vapiInstance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }
  return vapiInstance;
}

export function destroyVapiInstance() {
  if (vapiInstance) {
    try {
      vapiInstance.stop();
      if (vapiIstance.call && vapiInstance.call.leave) {
        vapiInstance.call.leave().catch(() => {});
      }
    } catch (e) {
      console.error("Error destroying Vapi instance:", e);
    }
    vapiInstance = null;
  }
}
