import { type NextApiHandler } from 'next';

export function catchAsync(fn: NextApiHandler): NextApiHandler {
  return (req, res) => {
    const promise = fn(req, res) as Promise<void>;

    promise.catch((err: any) => {
      res.status(500).send({
        error: err.message || 'Something went wrong',
      });
    });
  };
}
