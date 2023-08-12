"use client";
import { useForm } from "react-hook-form";
import Heading from "../../_components/Heading";
import { AiOutlineMessage } from "react-icons/ai";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "../../_components/Empty";
import Loader from "../../_components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "../../_components/UserAvatar";
import BotAvatar from "../../_components/BotAvatar";
import { BsCodeSlash } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const Code = () => {
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();
  const proModal = useProModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("working");
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((curr) => [...curr, userMessage, response.data]);
    } catch (error) {
      if (error?.response?.status === 403) {
        proModal.opOpen();
      } else {
        toast.error("Something Went wrong");
      }
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using description"
        Icon={BsCodeSlash}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Write the description of your code here..."
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent "
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No conversation started" />
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((msg, ele, i) => (
              <div
                key={msg.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  msg.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {msg.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-slate-800 text-white p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    // code: ({ node, ...props }) => (
                    //   <code {...props} className="bg-black/10 rounded-lg p-1" />
                    // ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {msg.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
