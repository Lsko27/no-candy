export async function sendEmail(name: string, email: string, message: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/send-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });

  if (!res.ok) throw new Error("Erro ao enviar e-mail");
  return res.json();
}
