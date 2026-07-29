import { permanentRedirect } from "next/navigation";

export default function SupportSuccessRedirect() {
  permanentRedirect("/publication");
}
