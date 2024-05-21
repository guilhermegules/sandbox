import { Button } from "@mfe/styleguide";

type MessageFieldProps = {
  onChangeMessage: (message: string) => void;
  message: string;
  onSubmitMessage: (message: string) => void;
};

export const MessageField = ({
  onChangeMessage,
  message,
  onSubmitMessage,
}: MessageFieldProps) => {
  return (
    <>
      <textarea
        className="p-4 w-full resize-none border-blue-300 border-2 rounded"
        name="text"
        id="text-field"
        placeholder="How are you doing?"
        onChange={(event) => onChangeMessage(event.target.value)}
        value={message}
      ></textarea>
      <Button
        className="bg-blue-300 text-white p-4 ml-2"
        onClick={() => onSubmitMessage(message)}
      >
        Send
      </Button>
    </>
  );
};
