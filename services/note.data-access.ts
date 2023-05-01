import Datastore from "nedb-promises";
import { Note } from "../models/note.model";

export class NoteDataAccess {
  constructor(public db?: Datastore) {
    const options =
      process.env.DB_TYPE === "FILE"
        ? { filename: "./data/notes.db", autoload: true }
        : {};

    this.db = db || Datastore.create(options);
  }

  async add(
    title: string,
    importance: number,
    dueDate: Date,
    finished: boolean,
    description: string
  ): Promise<Note> {
    const note = new Note(title, importance, dueDate, finished, description);
    console.log(note);
    return this.db!.insert(note);
  }

  async update(
    id: string,
    title: string,
    importance: number,
    dueDate: Date,
    finished: boolean,
    description: string
  ): Promise<Document> {
    const newNote = new Note(title, importance, dueDate, finished, description);
    await this.db!.update({ _id: id }, { $set: newNote });

    return this.get(id);
  }

  async get(id: string): Promise<Document> {
    return this.db!.findOne({ _id: id });
  }

  async all(): Promise<Note[]> {
    return this.db!.find<Note>({});
  }
}

export const noteDataAccess = new NoteDataAccess();