import Datastore from "nedb-promises";
import { Note } from "../models/note.model";

export class NoteDataAccess {
  constructor(public db?: Datastore) {
    const options =
      process.env.DB_TYPE === "FILE"
        ? { filename: "./data/db.db", autoload: true }
        : {};

    this.db = db || Datastore.create(options);
  }

  async save(note: Note) {
    if (note._id) {
      await this.db!.update({ _id: note._id }, { $set: note });
      return this.get(note._id);
    } else {
      return await this.db!.insert(note) as unknown as Note;
    }
  }

  async get(id: string): Promise<Note> {
    return this.db!.findOne({ _id: id }) as unknown as Note;
  }

  async all(orderByParam?: string, asc = true): Promise<Note[]> {
    if (orderByParam) {
      const orderBy = orderByParam as keyof Note;
      const orderDirection = asc ? 1 : -1;
      return this.db!.find<Note>({}).sort({ [orderBy]: orderDirection });
    }
    return this.db!.find<Note>({});
  }

  async deleteById(id: string) {
    if (!id) {
      return;
    }
    await this.db!.remove({ _id: id }, {
      multi: false
    });
  }
}

export const noteDataAccess = new NoteDataAccess();